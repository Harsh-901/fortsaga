const { supabase } = require("../db/supabase"); // Make sure this is set up

// Register controller
const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return res.status(400).json({ message: "User already exists" });
      }
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: "User registered successfully", user: data.user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { handleRegister };