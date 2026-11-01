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
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await dbClient.connect();
  // Ensure email confirmed for parent
  await dbClient.query(`
    UPDATE auth.users 
    SET email_confirmed_at = now() 
    WHERE email = 'phuhuynh@tieuhoc.edu.vn';
  `);
  // Update parent in public.users to match auth.users id
  const parentAuth = await dbClient.query(`SELECT id FROM auth.users WHERE email = 'phuhuynh@tieuhoc.edu.vn';`);
  if (parentAuth.rows.length > 0) {
    const pId = parentAuth.rows[0].id;
    await dbClient.query(`
      INSERT INTO public.users (id, email, full_name, role, phone_number, school_name)
      VALUES ($1, 'phuhuynh@tieuhoc.edu.vn', 'Phụ Huynh Bé An', 'parent', '0977889900', 'Trường Tiểu học Kim Đồng')
      ON CONFLICT (email) DO UPDATE SET
        id = EXCLUDED.id,
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role;
    `, [pId]);
    console.log('Parent synced with auth ID:', pId);
  }
  await dbClient.end();

  console.log('\n🔐 Testing logins with Supabase Client:');
  const sb = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

  const accounts = [
    { name: 'Admin', email: 'admin@tieuhoc.edu.vn', pass: process.env.VITE_ADMIN_PASSWORD },
    { name: 'Teacher', email: 'cothutam@tieuhoc.edu.vn', pass: process.env.VITE_TEACHER_PASSWORD },
    { name: 'Parent', email: 'phuhuynh@tieuhoc.edu.vn', pass: process.env.VITE_PARENT_PASSWORD },
  ];

  for (const acc of accounts) {
    const res = await sb.auth.signInWithPassword({
      email: acc.email,
      password: acc.pass,
    });
    if (res.error) {
      console.error(`❌ ${acc.name} (${acc.email}): ${res.error.message}`);
    } else {
      console.log(`✅ ${acc.name} (${acc.email}) -> LOGIN SUCCESS! User ID: ${res.data.user.id}`);
    }
  }
}

run().catch(console.error);
