const { Router } = require("express");
const { supabase } = require("../db/supabase");

const router = Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Supabase Auth handles user creation and password hashing
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: role || "citizen" }
      }
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return res.status(400).json({ error: "Email already registered" });
      }
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User registered successfully", user: data.user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Supabase Auth handles login and returns a session with JWT
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: data.session?.access_token,
      user: data.user
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;