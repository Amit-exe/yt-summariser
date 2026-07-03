const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // On Render, this overrides everything above automatically
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("DB connection failed:", err.message);
  } else {
    console.log("✅ Database connected");
    release();
  }
});

module.exports = pool;
