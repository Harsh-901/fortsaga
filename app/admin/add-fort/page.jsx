"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase, useUser } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

export default function AddFortPage() {
  const supabase = useSupabase();
  const { user, loading } = useUser();
  const router = useRouter();

  const [fortForm, setFortForm] = useState({
    name: "",
    location: "",
    district: "",
    coordinates: "",
    builtBy: "",
    builtYear: "",
    historicalPeriod: "",
    fortType: "",
    elevation: "",
    area: "",
    trekDifficulty: "",
    description: "",
    historicalSignificance: "",
    architecture: "",
    keyFeatures: "",
    visitingHours: "",
    //entryFee: "",
    bestTimeToVisit: "",
    accessibility: "",
    nearestRailway: "",
    nearestAirport: "",
    accommodation: "",
    images: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFortForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFortForm((prev) => {
      const images = [...prev.images];
      images.splice(index, 1);
      return { ...prev, images };
    });
  };

  const handleSubmitFort = async (e) => {
    e.preventDefault();

    if (loading) {
      alert("Loading user information, please wait...");
      return;
    }
    if (!user) {
      alert("Please log in to add a fort");
      return;
    }
    if (!fortForm.name || !fortForm.location) {
      alert("Fort name and location are required");
      return;
    }

    const fortData = {
      ...fortForm,
      image_url: fortForm.images[0]?.preview || "",
      created_by: user.id,
    };

    try {
      const res = await fetch("/api/forts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fortData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/admin");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow">
          Please log in to add a fort.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef6e4] py-12 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto bg-[#fffdf7] rounded-2xl shadow-md p-12 sm:p-16">
        <h1 className="text-4xl font-extrabold text-[#0b2545] mb-12 text-center">
          Add New Fort
        </h1>

        <form onSubmit={handleSubmitFort} className="space-y-16">
          {/* SECTION WRAPPER */} 
          {[  
            { title: "Basic Information", fields: ["name", "location", "district", "coordinates"] },
            { title: "Historical Information", fields: ["builtBy", "builtYear", "historicalPeriod", "fortType"] },
            { title: "Physical Details", fields: ["elevation", "area", "trekDifficulty"] },
          ].map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-3 text-slate-800">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field}>
                    <Label className="capitalize text-slate-700 font-medium">{field.replace(/([A-Z])/g, " $1")}</Label>
                    {field === "historicalPeriod" || field === "fortType" || field === "trekDifficulty" ? (
                      <Select
                        value={fortForm[field]}
                        onValueChange={(value) => setFortForm({ ...fortForm, [field]: value })}
                        className="mt-1"
                      >
                        <SelectTrigger className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder={`Select ${field}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field === "historicalPeriod" && (
                            <>
                              <SelectItem value="maratha">Maratha Empire</SelectItem>
                              <SelectItem value="mughal">Mughal Period</SelectItem>
                              <SelectItem value="british">British Period</SelectItem>
                              <SelectItem value="ancient">Ancient Period</SelectItem>
                              <SelectItem value="medieval">Medieval Period</SelectItem>
                            </>
                          )}
                          {field === "fortType" && (
                            <>
                              <SelectItem value="hill">Hill Fort</SelectItem>
                              <SelectItem value="sea">Sea Fort</SelectItem>
                              <SelectItem value="land">Land Fort</SelectItem>
                              <SelectItem value="mountain">Mountain Fort</SelectItem>
                            </>
                          )}
                          {field === "trekDifficulty" && (
                            <>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="difficult">Difficult</SelectItem>
                              <SelectItem value="extreme">Extreme</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        value={fortForm[field]}
                        onChange={(e) => setFortForm({ ...fortForm, [field]: e.target.value })}
                        className="mt-1 border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* DETAILED TEXTAREAS */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold border-b border-gray-300 pb-3 text-slate-800">
              Detailed Information
            </h3>
            {["description", "historicalSignificance", "architecture", "keyFeatures"].map(
              (field) => (
                <Textarea
                  key={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={fortForm[field]}
                  onChange={(e) => setFortForm({ ...fortForm, [field]: e.target.value })}
                  className="border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              )
            )}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold border-b border-gray-300 pb-3 text-slate-800">
              Images
            </h3>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("images").click()}
              className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-primary rounded-xl"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Images
            </Button>

            {fortForm.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {fortForm.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                  >
                    <img
                      src={img.preview}
                      className="w-full h-28 object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(idx)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full h-14 text-lg font-semibold rounded-xl"
          >
            Add Fort
          </Button>
        </form>
      </div>
    </div>
  );
}
