import pg from 'pg';
import fs from 'fs';
import path from 'path';

if (process.loadEnvFile) {
  process.loadEnvFile('.env');
} else {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      process.env[key.trim()] = values.join('=').trim();
    }
  }
}

const { Client } = pg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("No DATABASE_URL found in .env");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: true }
});

async function run() {
  console.log("Connecting to Supabase PostgreSQL database...");
  await client.connect();
  console.log("Connected successfully!");

  const migrationFiles = [
    '20261031_full_schema.sql',
    '20261101053116_harden_rls_authorization.sql',
  ];
  await client.query('BEGIN');
  try {
    for (const migrationFile of migrationFiles) {
      const sqlPath = path.resolve('supabase/migrations', migrationFile);
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      console.log(`Executing ${migrationFile}...`);
      await client.query(sqlContent);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  console.log("Schema and authorization migrations applied successfully!");

  // Query created tables
  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  console.log("\nTables currently in public schema:");
  res.rows.forEach(r => console.log(" - " + r.table_name));

  // Query count of subjects
  const subjects = await client.query('SELECT * FROM public.subjects');
  console.log(`\nSubjects seeded (${subjects.rows.length}):`);
  subjects.rows.forEach(s => console.log(` - [${s.id}] ${s.name} (${s.icon})`));

  // Query count of users
  const users = await client.query('SELECT id, email, full_name, role FROM public.users');
  console.log(`\nUsers seeded (${users.rows.length}):`);
  users.rows.forEach(u => console.log(` - [${u.role}] ${u.full_name} (${u.email})`));

  await client.end();
}

run().catch(err => {
  console.error("Migration error:", err);
  process.exit(1);
});
