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
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected directly to Supabase PostgreSQL database!');

    const migrationFile = path.join(__dirname, '..', 'supabase', 'migrations', '20261031_full_schema.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');

    await client.query(sql);
    console.log('🎉 TOÀN BỘ 11 BẢNG & RLS & SEED DATA ĐÃ ĐƯỢC CẬP NHẬT TRÊN SUPABASE!');

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
