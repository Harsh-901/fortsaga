const { supabase } = require("../db/supabase");

async function getReports(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map to the format expected by frontend
    const mappedData = data.map((reports) => ({
      id: `RPT-${reports.id.slice(0, 8).toUpperCase()}`, // Shorten UUID for display
      fort: reports.fort,
      issue: reports.description,
      urgency: reports.urgency,
      date: new Date(report.created_at).toLocaleDateString(),
      location: reports.location || "",
      category: reports.category,
      images: reports.images || [],
    }));

    res.json(mappedData);
  } catch (err) {
    next(err);
  }
}

async function createReport(req, res, next) {
  try {
    const { fort, category, urgency, description, location, images } = req.body;

    const { data, error } = await supabase
      .from("reports")
      .insert([{ fort, category, urgency, description, location, images }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { getReports, createReport };
