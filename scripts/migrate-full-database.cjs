const fs = require('fs');
const path = require('path');
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
