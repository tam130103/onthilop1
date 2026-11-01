const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Đọc an toàn từ biến môi trường DATABASE_URL trong .env, tuyệt đối không hardcode mật khẩu
if (process.loadEnvFile) {
  process.loadEnvFile(path.join(__dirname, '..', '.env'));
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Lỗi: Không tìm thấy biến môi trường DATABASE_URL trong .env');
  process.exit(1);
}

async function migrate() {
  const sslConfig = process.env.DB_SSL_CA
    ? { ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'), rejectUnauthorized: true }
    : { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true' };

  const client = new Client({
    connectionString,
    ssl: sslConfig,
  });

  try {
    await client.connect();
    console.log('✅ Connected directly to Supabase PostgreSQL database!');

    const migrationFiles = [
      '20261031_full_schema.sql',
      '20261101053116_harden_rls_authorization.sql',
    ];
    await client.query('BEGIN');
    try {
      for (const migrationFile of migrationFiles) {
        const filePath = path.join(__dirname, '..', 'supabase', 'migrations', migrationFile);
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Applying ${migrationFile}...`);
        await client.query(sql);
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
    console.log('🎉 Schema, seed data, and hardened RLS policies are up to date!');

    // Verify all tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('📋 Danh sách bảng hiện có trên Supabase:');
    res.rows.forEach(r => console.log(' - ' + r.table_name));

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi chạy migration:', err);
    await client.end().catch(() => {});
    process.exit(1);
  }
}

migrate();
