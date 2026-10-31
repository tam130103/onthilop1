const { Client } = require('pg');

const connectionString = 'postgresql://postgres:2b5POd5KbsD5wjNH@db.vrjzkbndyfdmepvllxcu.supabase.co:5432/postgres';

async function migrate() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected directly to Supabase PostgreSQL database!');

    const sql = `
      -- 1. BẢNG MÔN HỌC (subjects)
      CREATE TABLE IF NOT EXISTS public.subjects (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          icon TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      -- 2. BẢNG LỚP HỌC (classrooms)
      CREATE TABLE IF NOT EXISTS public.classrooms (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          grade_level INT DEFAULT 1,
          academic_year TEXT DEFAULT '2025-2026',
          teacher_name TEXT DEFAULT 'Cô giáo',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      -- 3. BẢNG 4 TỔ THI ĐUA (teams)
      CREATE TABLE IF NOT EXISTS public.teams (
          id TEXT PRIMARY KEY,
          classroom_id TEXT REFERENCES public.classrooms(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          color_hex TEXT NOT NULL,
          score INT DEFAULT 0,
          order_index INT DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      -- 4. BẢNG HỌC SINH (students)
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

      -- 5. BẢNG ĐIỂM DANH HÀNG NGÀY (attendance)
      CREATE TABLE IF NOT EXISTS public.attendance (
          id BIGSERIAL PRIMARY KEY,
          student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
          date DATE DEFAULT CURRENT_DATE,
          is_absent BOOLEAN DEFAULT FALSE,
          reason TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      -- 6. BẢNG CHẶNG HỌC (stages)
      CREATE TABLE IF NOT EXISTS public.stages (
          id TEXT PRIMARY KEY,
          subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
          stage_number INT NOT NULL,
          title TEXT NOT NULL,
          icon TEXT DEFAULT '🌱',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
      );

      -- 7. BẢNG BÀI HỌC / BÀI GIẢNG (lessons)
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

      -- 8. BẢNG LỊCH SỬ TIẾT DẠY (teaching_sessions)
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

      -- 9. BẢNG KẾT QUẢ CHI TIẾT TỪNG CÂU HỎI (student_results)
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

      -- 10. BẢNG TỔNG HỢP CÂU HAY SAI ĐỂ ÔN TẬP ĐẦU GIỜ (class_mistakes)
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

      -- 11. BẬT ROW LEVEL SECURITY VÀ CẤP QUYỀN ĐỌC GHI CHO WEB
      DO $$
      DECLARE
        t text;
      BEGIN
        FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
          EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
          EXECUTE format('DROP POLICY IF EXISTS "Allow public access" ON public.%I', t);
          EXECUTE format('CREATE POLICY "Allow public access" ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
          EXECUTE format('GRANT ALL ON public.%I TO anon, authenticated, service_role', t);
        END LOOP;
      END
      $$;

      -- 12. SEED DỮ LIỆU BAN ĐẦU CHUẨN
      -- Môn học
      INSERT INTO public.subjects (id, name, icon, description) VALUES
        ('math', 'Toán Lớp 1', '🔢', 'Toán học trực quan theo chặng chuẩn GDPT 2018'),
        ('vietnamese', 'Tiếng Việt Lớp 1', '📖', 'Học vần, chữ cái và rèn đọc tương tác'),
        ('english', 'Tiếng Anh Lớp 1', '🇬🇧', 'Global Success Grade 1')
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

      -- Lớp học mẫu
      INSERT INTO public.classrooms (id, name, grade_level, academic_year, teacher_name) VALUES
        ('class-1a1', 'Lớp 1A1', 1, '2025-2026', 'Cô giáo chủ nhiệm')
      ON CONFLICT (id) DO NOTHING;

      -- 4 Tổ thi đua mẫu
      INSERT INTO public.teams (id, classroom_id, name, color_hex, score, order_index) VALUES
        ('team-1', 'class-1a1', 'Đội Sao Vàng', '#eab308', 0, 1),
        ('team-2', 'class-1a1', 'Đội Măng Non', '#22c55e', 0, 2),
        ('team-3', 'class-1a1', 'Đội Tia Chớp', '#3b82f6', 0, 3),
        ('team-4', 'class-1a1', 'Đội Mặt Trời', '#ef4444', 0, 4)
      ON CONFLICT (id) DO NOTHING;
    `;

    await client.query(sql);
    console.log('🎉 TOÀN BỘ 10 BẢNG VÀ DỮ LIỆU BAN ĐẦU ĐÃ ĐƯỢC TẠO THÀNH CÔNG TRÊN SUPABASE!');
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi chạy migration:', err);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

migrate();
