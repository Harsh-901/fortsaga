const { supabase } = require("../db/supabase"); // Update this path as needed

async function getForts(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getFortBySlug(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("forts")
      .select("*")
      .eq("slug", req.params.slug)
      .single();

    if (error && error.code === "PGRST116") {
      // Not found
      return res.status(404).json({ error: "Not found" });
    }
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getForts, getFortBySlug };