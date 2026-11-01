import pg from 'pg';

if (process.loadEnvFile) {
  process.loadEnvFile('.env');
}

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log('Connected to database successfully.');

  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);
  console.log('Tables:', tablesRes.rows.map(r => r.table_name));

  const policiesRes = await client.query(`
    SELECT tablename, policyname, cmd, permissive, roles 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    ORDER BY tablename, policyname;
  `);
  console.log(`\nFound ${policiesRes.rows.length} policies:`);
  for (const pol of policiesRes.rows) {
    console.log(` - [${pol.tablename}] "${pol.policyname}" (${pol.cmd})`);
  }

  const usersRes = await client.query(`SELECT id, email, full_name, role FROM public.users ORDER BY role;`);
  console.log('\nUsers in public.users:');
  console.table(usersRes.rows);

  await client.end();
}

main().catch((err) => {
  console.error('Error inspecting db:', err);
  process.exit(1);
});
