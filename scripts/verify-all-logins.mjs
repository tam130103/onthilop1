import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.loadEnvFile(path.join(__dirname, '..', '.env'));

const { Client } = pg;
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
});

async function run() {
  await dbClient.connect();
  const accounts = [
    {
      name: 'Admin',
      email: process.env.VITE_ADMIN_EMAIL || 'admin@tieuhoc.edu.vn',
      fullName: process.env.VITE_ADMIN_NAME || 'Thầy Quản Trị Viên',
      role: 'admin',
      password: process.env.ADMIN_PASSWORD,
    },
    {
      name: 'Teacher',
      email: process.env.VITE_TEACHER_EMAIL || 'cothutam@tieuhoc.edu.vn',
      fullName: process.env.VITE_TEACHER_NAME || 'Cô Nguyễn Thu Tâm',
      role: 'teacher',
      password: process.env.TEACHER_PASSWORD,
    },
    {
      name: 'Parent',
      email: process.env.VITE_PARENT_EMAIL || 'phuhuynh@tieuhoc.edu.vn',
      fullName: process.env.VITE_PARENT_NAME || 'Phụ Huynh Bé An',
      role: 'parent',
      password: process.env.PARENT_PASSWORD,
    },
  ];

  for (const account of accounts) {
    const authUser = await dbClient.query(
      'SELECT id, email FROM auth.users WHERE lower(email) = lower($1) LIMIT 1',
      [account.email],
    );
    const row = authUser.rows[0];
    if (!row) {
      console.warn(`⚠️ ${account.name}: Auth account not found; profile was not provisioned.`);
      continue;
    }

    await dbClient.query(`
      INSERT INTO public.users (id, email, full_name, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        id = EXCLUDED.id,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        updated_at = now();
    `, [row.id, row.email, account.fullName, account.role]);
    console.log(`✅ ${account.name}: public profile synced to Auth UUID ${row.id}`);

    if (account.role === 'teacher') {
      await dbClient.query(
        "UPDATE public.classrooms SET teacher_id = $1 WHERE id = 'class-1a1' AND teacher_id IS NULL",
        [row.id],
      );
    }
  }
  await dbClient.end();

  console.log('\n🔐 Testing logins with Supabase Client:');
  const sb = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

  for (const account of accounts) {
    if (!account.password) {
      console.warn(`⚠️ ${account.name}: missing password environment variable; login check skipped.`);
      continue;
    }
    const res = await sb.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    });
    if (res.error) {
      console.error(`❌ ${account.name} (${account.email}): ${res.error.message}`);
    } else {
      console.log(`✅ ${account.name} (${account.email}) -> LOGIN SUCCESS! User ID: ${res.data.user.id}`);
    }
  }
}

run().catch(console.error);
