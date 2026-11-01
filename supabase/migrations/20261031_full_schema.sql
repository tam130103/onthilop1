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
-- HÀM KIỂM TRA PHÂN QUYỀN (is_admin & is_owner)
-- ====================================================================

-- 1. Hàm is_admin(): kiểm tra tài khoản hiện tại có vai trò 'admin' hay không
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = '';

-- 2. Hàm is_owner(): kiểm tra phiên người dùng có session authenticated hợp lệ
CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = '';

-- 3. Hàm is_owner(owner_id): kiểm tra UUID chủ sở hữu khớp auth.uid()
CREATE OR REPLACE FUNCTION public.is_owner(owner_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL AND owner_id IS NOT NULL AND auth.uid() = owner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = '';

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) - PHÂN QUYỀN CHẶT CHẼ
-- Admin toàn quyền; Giáo viên thao tác theo phạm vi sở hữu (is_owner)
-- ====================================================================

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS "Allow public access" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "Public access policy" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "owner_only" ON public.%I', t);
    EXECUTE format('DROP POLICY IF EXISTS "owner_only_%s" ON public.%I', t, t);
    EXECUTE format('DROP POLICY IF EXISTS "authenticated_only_%s" ON public.%I', t, t);
  END LOOP;
END
$$;

-- Tước quyền anon
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon;

-- Cấp quyền authenticated & service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_owner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_owner() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated, service_role;

-- Do not install permissive policies here. RLS remains deny-by-default until
-- the next migration installs the class-scoped policies.

-- SEED DATA BAN ĐẦU
-- 1. Môn học
INSERT INTO public.subjects (id, name, icon, description) VALUES
  ('math', 'Toán Lớp 1', '🔢', 'Toán học trực quan theo chặng chuẩn GDPT 2018'),
  ('vietnamese', 'Tiếng Việt Lớp 1', '📖', 'Học vần, chữ cái và rèn đọc tương tác'),
  ('english', 'Tiếng Anh Lớp 1', '🇬🇧', 'Global Success Grade 1')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 2. Lớp học mẫu. Chỉ gắn giáo viên nếu hồ sơ khớp email đã provision.
INSERT INTO public.classrooms (id, teacher_id, name, grade_level, academic_year, teacher_name) VALUES
  ('class-1a1', (SELECT id FROM public.users WHERE lower(email) = 'cothutam@tieuhoc.edu.vn' LIMIT 1), 'Lớp 1A1', 1, '2025-2026', 'Cô Thu Tâm')
ON CONFLICT (id) DO UPDATE SET 
  teacher_name = EXCLUDED.teacher_name;

-- 3. 4 Tổ thi đua mẫu
INSERT INTO public.teams (id, classroom_id, name, color_hex, score, order_index) VALUES
  ('team-1', 'class-1a1', 'Đội Sao Vàng', '#eab308', 0, 1),
  ('team-2', 'class-1a1', 'Đội Măng Non', '#22c55e', 0, 2),
  ('team-3', 'class-1a1', 'Đội Tia Chớp', '#3b82f6', 0, 3),
  ('team-4', 'class-1a1', 'Đội Mặt Trời', '#ef4444', 0, 4)
ON CONFLICT (id) DO NOTHING;
