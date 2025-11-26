const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

async function main() {
  const sqlPath = path.join(__dirname, '..', 'supabase.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('supabase.sql not found at', sqlPath);
    process.exit(1);
  }
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;
  if (!databaseUrl) {
    console.error('Please set DATABASE_URL environment variable (Supabase DB connection string).');
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    console.log('Connected to DB. Running SQL...');
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('SQL executed successfully.');
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Error executing SQL:', err.message || err);
  } finally {
    await client.end();
  }
}

main();
