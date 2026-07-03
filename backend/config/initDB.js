const pool = require("./db");

const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS summaries (
        id SERIAL PRIMARY KEY,
        video_id VARCHAR(50) NOT NULL,
        video_url TEXT NOT NULL,
        summary_type VARCHAR(20) NOT NULL,
        summary_title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        cached BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(video_id, summary_type)
      );

      CREATE TABLE IF NOT EXISTS user_summaries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        summary_id INTEGER REFERENCES summaries(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, summary_id)
      );

      CREATE TABLE IF NOT EXISTS transcripts (
        id SERIAL PRIMARY KEY,
        video_id VARCHAR(50) UNIQUE NOT NULL,
        video_url TEXT,
        transcript TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Tables created");
  } catch (err) {
    console.error("Table creation failed:", err.message);
  }
};

module.exports = initDb;
