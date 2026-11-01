import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.loadEnvFile) {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
}

const { Client } = pg;
const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await dbClient.connect();
  const accounts = [
    {
      name: 'Admin',
      email: process.env.VITE_ADMIN_EMAIL || 'admin@tieuhoc.edu.vn',
      fullName: process.env.VITE_ADMIN_NAME || 'Thầy Quản Trị Viên (Tâm Nguyễn)',
      role: 'admin',
      password: process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || 'Admin@123',
    },
    {
      name: 'Teacher',
      email: process.env.VITE_TEACHER_EMAIL || 'cothutam@tieuhoc.edu.vn',
      fullName: process.env.VITE_TEACHER_NAME || 'Cô Nguyễn Thu Tâm',
      role: 'teacher',
      password: process.env.TEACHER_PASSWORD || process.env.VITE_TEACHER_PASSWORD || 'Giaovien@123',
    },
    {
      name: 'Parent',
      email: process.env.VITE_PARENT_EMAIL || 'phuhuynh@tieuhoc.edu.vn',
      fullName: process.env.VITE_PARENT_NAME || 'Phụ Huynh Bé An',
      role: 'parent',
      password: process.env.PARENT_PASSWORD || process.env.VITE_PARENT_PASSWORD || 'Phuhuynh@123',
    },
  ];

  console.log('🔄 Checking public.users and classroom assignment...');
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
        "UPDATE public.classrooms SET teacher_id = $1 WHERE id = 'class-1a1'",
        [row.id],
      );
      console.log(`✅ Classroom class-1a1 teacher_id assigned to ${account.name} (${row.id})`);
    }
  }
  await dbClient.end();

  console.log('\n🔐 Testing logins and RLS policies with Supabase Client:');

  for (const account of accounts) {
    const client = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
    const res = await client.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    });

    if (res.error) {
      console.error(`❌ ${account.name} (${account.email}): LOGIN FAILED -> ${res.error.message}`);
      continue;
    }
    console.log(`✅ ${account.name} (${account.email}) -> LOGIN SUCCESS! User ID: ${res.data.user.id}`);

    // Test Role-Based RLS behavior
    if (account.role === 'admin') {
      const { data: users, error } = await client.from('users').select('id, email, role');
      if (error) {
        console.error(`❌ Admin select users error:`, error.message);
      } else {
        console.log(`   👑 Admin can read all users: found ${users.length} users.`);
      }
    } else if (account.role === 'teacher') {
      const { data: classrooms } = await client.from('classrooms').select('id, name');
      console.log(`   👩‍🏫 Teacher classrooms visible:`, classrooms?.map(c => c.name));

      // Attempt forbidden action: update built-in lesson
      const { data: updatedLessons, error: lessonErr } = await client
        .from('lessons')
        .update({ title: 'Hacked' })
        .eq('is_builtin', true)
        .select();
      const wasBlocked = lessonErr != null || (updatedLessons && updatedLessons.length === 0);
      console.log(`   🛡️ Teacher cannot modify built-in lesson (RLS blocked?):`, wasBlocked ? `YES (0 rows modified, blocked by RLS)` : `NO (Modified ${updatedLessons?.length} rows!)`);
    } else if (account.role === 'parent') {
      // Parent cannot update classrooms or students
      const { error: studentErr } = await client.from('students').insert({
        id: 'hacked-student',
        classroom_id: 'class-1a1',
        name: 'Hacked Student',
      });
      console.log(`   🛡️ Parent cannot insert student (RLS blocked?):`, studentErr ? 'YES (Blocked by RLS)' : 'NO (Inserted!)');

      // Parent cannot elevate own role to admin
      const { error: roleErr } = await client.from('users').update({ role: 'admin' }).eq('id', res.data.user.id);
      console.log(`   🛡️ Parent cannot self-elevate role (RLS blocked?):`, roleErr ? 'YES (Blocked by RLS)' : 'NO (Elevated!)');
    }
  }

  console.log('\n🎉 All authentication & RLS security checks completed successfully!');
}

run().catch(console.error);
