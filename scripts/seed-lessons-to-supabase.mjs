import pg from 'pg';
import fs from 'fs';
import path from 'path';

if (process.loadEnvFile) {
  process.loadEnvFile('.env');
}

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  await client.connect();
  console.log("Connected to Supabase.");

  // 1. Seed stages
  console.log("Seeding stages...");
  const stages = [
    { id: 'math-stage-1', subject_id: 'math', stage_number: 1, title: 'Chặng 1: Làm quen với số & Hình khối', icon: '🌱' },
    { id: 'math-stage-2', subject_id: 'math', stage_number: 2, title: 'Chặng 2: Phép cộng trừ trong phạm vi 10', icon: '➕' },
    { id: 'vn-stage-1', subject_id: 'vietnamese', stage_number: 1, title: 'Chặng 1: Bảng chữ cái âm đơn', icon: '🔤' },
    { id: 'vn-stage-2', subject_id: 'vietnamese', stage_number: 2, title: 'Chặng 2: Phụ âm ghép & Quy tắc chính tả', icon: '📝' }
  ];

  for (const s of stages) {
    await client.query(`
      INSERT INTO public.stages (id, subject_id, stage_number, title, icon)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        subject_id = EXCLUDED.subject_id,
        stage_number = EXCLUDED.stage_number,
        title = EXCLUDED.title,
        icon = EXCLUDED.icon;
    `, [s.id, s.subject_id, s.stage_number, s.title, s.icon]);
  }

  // 2. Read all lesson JSONs and seed into public.lessons
  console.log("Seeding lessons...");
  const lessonsDir = path.resolve('content/lessons');
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));

  for (const f of files) {
    const raw = fs.readFileSync(path.join(lessonsDir, f), 'utf8');
    const lesson = JSON.parse(raw);

    const stageId = lesson.subject === 'math' ? 'math-stage-1' : 'vn-stage-1';

    await client.query(`
      INSERT INTO public.lessons (
        id, stage_id, subject, title, description, status, content_json, total_slides, is_builtin
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        stage_id = EXCLUDED.stage_id,
        subject = EXCLUDED.subject = EXCLUDED.subject,
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        status = EXCLUDED.status,
        content_json = EXCLUDED.content_json,
        total_slides = EXCLUDED.total_slides,
        is_builtin = EXCLUDED.is_builtin,
        updated_at = NOW();
    `, [
      lesson.id,
      stageId,
      lesson.subject,
      lesson.title,
      lesson.description || '',
      lesson.status || 'publish',
      JSON.stringify(lesson),
      lesson.slides?.length || 1,
      true
    ]);
    console.log(` - Seeded lesson: ${lesson.id} (${lesson.title})`);
  }

  // 3. Seed demo classroom & teams & students
  console.log("Seeding classroom & students...");
  await client.query(`
    INSERT INTO public.classrooms (id, name, grade_level, academic_year, teacher_name)
    VALUES ('class-1a1', 'Lớp 1A1', 1, '2025-2026', 'Cô Nguyễn Thu Tâm')
    ON CONFLICT (id) DO NOTHING;
  `);

  const teams = [
    { id: 'team-1', name: 'Đội Xanh Dương', color: '#3b82f6', order: 1 },
    { id: 'team-2', name: 'Đội Đỏ', color: '#ef4444', order: 2 },
    { id: 'team-3', name: 'Đội Vàng', color: '#eab308', order: 3 },
    { id: 'team-4', name: 'Đội Xanh Lá', color: '#22c55e', order: 4 },
  ];

  for (const t of teams) {
    await client.query(`
      INSERT INTO public.teams (id, classroom_id, name, color_hex, score, order_index)
      VALUES ($1, 'class-1a1', $2, $3, 0, $4)
      ON CONFLICT (id) DO NOTHING;
    `, [t.id, t.name, t.color, t.order]);
  }

  const sampleStudents = [
    { id: 'hs-01', code: 'HS-1A1-01', name: 'Nguyễn Văn An', gender: 'Nam', team_id: 'team-1' },
    { id: 'hs-02', code: 'HS-1A1-02', name: 'Trần Thị Mai', gender: 'Nữ', team_id: 'team-1' },
    { id: 'hs-03', code: 'HS-1A1-03', name: 'Lê Hoàng Nam', gender: 'Nam', team_id: 'team-2' },
    { id: 'hs-04', code: 'HS-1A1-04', name: 'Phạm Quỳnh Chi', gender: 'Nữ', team_id: 'team-2' },
    { id: 'hs-05', code: 'HS-1A1-05', name: 'Vũ Đức Minh', gender: 'Nam', team_id: 'team-3' },
    { id: 'hs-06', code: 'HS-1A1-06', name: 'Đặng Ngọc Lan', gender: 'Nữ', team_id: 'team-3' },
    { id: 'hs-07', code: 'HS-1A1-07', name: 'Hoàng Gia Bảo', gender: 'Nam', team_id: 'team-4' },
    { id: 'hs-08', code: 'HS-1A1-08', name: 'Ngô Thảo Linh', gender: 'Nữ', team_id: 'team-4' },
  ];

  for (const s of sampleStudents) {
    await client.query(`
      INSERT INTO public.students (id, classroom_id, team_id, student_code, name, gender)
      VALUES ($1, 'class-1a1', $2, $3, $4, $5)
      ON CONFLICT (id) DO NOTHING;
    `, [s.id, s.team_id, s.code, s.name, s.gender]);
  }

  console.log("Seeding complete!");
  await client.end();
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
