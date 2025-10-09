import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase service role key (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Required fields check
    const requiredFields = ["fort", "description", "urgency", "location"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const reportData = {
      fort: body.fort,
      issue: body.description,
      category: body.category,
      reporter_name: "Anonymous",
      status: "pending",
      urgency: body.urgency,
      location: body.location,
      images: body.images || [],
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("reports")
      .insert([reportData])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Report submitted successfully", data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
