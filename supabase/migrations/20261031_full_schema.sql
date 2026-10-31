-- ====================================================================
-- FULL DATABASE SCHEMA - ONTHI.APP CLONE (GRADE 1 INTERACTIVE PRESENTATION)
-- 5 Nhóm bảng chính: Users, Classroom & Students, Curriculum, Sessions, Analytics
-- ====================================================================

-- 1. NHÓM QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN (Auth & Users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'teacher' CHECK (role IN ('admin', 'teacher', 'parent')),
    phone_number TEXT,
    school_name TEXT DEFAULT 'Trường Tiểu học',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. NHÓM LỚP HỌC, HỌC SINH & THI ĐUA (Classroom & Students)
CREATE TABLE IF NOT EXISTS public.classrooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    grade_level INT DEFAULT 1,
    academic_year TEXT DEFAULT '2025-2026',
    teacher_name TEXT DEFAULT 'Cô giáo chủ nhiệm',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.classrooms ADD COLUMN IF NOT EXISTS teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.teams (
    id TEXT PRIMARY KEY,
    classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color_hex TEXT NOT NULL,
    score INT DEFAULT 0,
    order_index INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE CASCADE,
    team_id TEXT REFERENCES public.teams(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    gender TEXT DEFAULT 'Nam',
    is_absent BOOLEAN DEFAULT FALSE,
    call_count INT DEFAULT 0,
    stars INT DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE CASCADE;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS student_code TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

CREATE TABLE IF NOT EXISTS public.attendance (
    id BIGSERIAL PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    is_absent BOOLEAN DEFAULT FALSE,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. NHÓM CHƯƠNG TRÌNH & BÀI GIẢNG (Curriculum & Lessons)
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.stages (
    id TEXT PRIMARY KEY,
    subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
    stage_number INT NOT NULL,
    title TEXT NOT NULL,
    icon TEXT DEFAULT '🌱',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    stage_id TEXT REFERENCES public.stages(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'publish',
    content_json JSONB,
    total_slides INT DEFAULT 1,
    is_builtin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES public.users(id) ON DELETE SET NULL;

-- 4. NHÓM PHIÊN DẠY & ĐIỂM SỐ (Sessions & Results)
CREATE TABLE IF NOT EXISTS public.teaching_sessions (
    id TEXT PRIMARY KEY,
    classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE SET NULL,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    end_time TIMESTAMP WITH TIME ZONE,
    total_questions INT DEFAULT 0,
    total_correct INT DEFAULT 0,
    stars_awarded INT DEFAULT 0,
    notes TEXT
);
ALTER TABLE public.teaching_sessions ADD COLUMN IF NOT EXISTS teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS public.student_results (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT REFERENCES public.teaching_sessions(id) ON DELETE CASCADE,
    student_id TEXT REFERENCES public.students(id) ON DELETE SET NULL,
    team_id TEXT REFERENCES public.teams(id) ON DELETE SET NULL,
    question_id TEXT NOT NULL,
    selected_answer TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    time_spent_seconds INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. NHÓM CÂU HAY SAI & ÔN TẬP (Mistakes & Remediation)
CREATE TABLE IF NOT EXISTS public.class_mistakes (
    id BIGSERIAL PRIMARY KEY,
    classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    lesson_title TEXT,
    subject TEXT DEFAULT 'math',
    question_data JSONB NOT NULL,
    wrong_count INT DEFAULT 1,
    is_mastered BOOLEAN DEFAULT FALSE,
    last_occurred_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) - BẢO MẬT CHẶT CHẼ
-- Không GRANT gì cho anon; Chỉ authenticated user mới có quyền truy cập
-- ====================================================================

-- 1. Bật RLS trên toàn bộ 11 bảng
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    -- Xóa các policy public cũ
    EXECUTE format('DROP POLICY IF EXISTS "Allow public access" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public access policy" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "owner_only" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "owner_only_%s" ON public.%I', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "authenticated_only_%s" ON public.%I', t, t);
  END LOOP;
END
$$;

-- 2. Tước toàn bộ quyền của anon trên toàn schema public
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon;

-- 3. Cấp toàn quyền cho authenticated và service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated, service_role;

-- 4. Chính sách owner_only cho người dùng (Chỉ xem và sửa hồ sơ chính mình)
CREATE POLICY "owner_only_users" ON public.users
  FOR ALL TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- 5. Chính sách owner_only cho lớp học (Chỉ giáo viên sở hữu hoặc lớp chung)
CREATE POLICY "owner_only_classrooms" ON public.classrooms
  FOR ALL TO authenticated
  USING (teacher_id = auth.uid() OR teacher_id IS NULL)
  WITH CHECK (teacher_id = auth.uid() OR teacher_id IS NULL);

-- 6. Chính sách cho các bảng dữ liệu lớp học (Yêu cầu authenticated)
CREATE POLICY "owner_only_teams" ON public.teams
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "owner_only_students" ON public.students
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "owner_only_attendance" ON public.attendance
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 7. Chính sách cho chương trình & bài giảng
CREATE POLICY "authenticated_only_subjects" ON public.subjects
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_only_stages" ON public.stages
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "authenticated_only_lessons" ON public.lessons
  FOR ALL TO authenticated
  USING (author_id = auth.uid() OR author_id IS NULL OR is_builtin = true)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 8. Chính sách cho phiên dạy và điểm số
CREATE POLICY "owner_only_teaching_sessions" ON public.teaching_sessions
  FOR ALL TO authenticated
  USING (teacher_id = auth.uid() OR teacher_id IS NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "owner_only_student_results" ON public.student_results
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "owner_only_class_mistakes" ON public.class_mistakes
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- 9. Trigger tự động đồng bộ auth.users sang public.users khi đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'teacher'
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- SEED DATA BAN ĐẦU
-- 1. Môn học
INSERT INTO public.subjects (id, name, icon, description) VALUES
  ('math', 'Toán Lớp 1', '🔢', 'Toán học trực quan theo chặng chuẩn GDPT 2018'),
  ('vietnamese', 'Tiếng Việt Lớp 1', '📖', 'Học vần, chữ cái và rèn đọc tương tác'),
  ('english', 'Tiếng Anh Lớp 1', '🇬🇧', 'Global Success Grade 1')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 2. Lớp học mẫu
INSERT INTO public.classrooms (id, name, grade_level, academic_year, teacher_name) VALUES
  ('class-1a1', 'Lớp 1A1', 1, '2025-2026', 'Cô Thu Tâm')
ON CONFLICT (id) DO UPDATE SET teacher_name = EXCLUDED.teacher_name;

-- 3. 4 Tổ thi đua mẫu
INSERT INTO public.teams (id, classroom_id, name, color_hex, score, order_index) VALUES
  ('team-1', 'class-1a1', 'Đội Sao Vàng', '#eab308', 0, 1),
  ('team-2', 'class-1a1', 'Đội Măng Non', '#22c55e', 0, 2),
  ('team-3', 'class-1a1', 'Đội Tia Chớp', '#3b82f6', 0, 3),
  ('team-4', 'class-1a1', 'Đội Mặt Trời', '#ef4444', 0, 4)
ON CONFLICT (id) DO NOTHING;
