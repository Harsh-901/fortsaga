// server.js
require("dotenv").config();

const app = require("./app");
const { supabase } = require('./db/supabase'); 

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // No need to connect to MongoDB
    app.listen(PORT, () => {
      console.log(`FortSaga backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();