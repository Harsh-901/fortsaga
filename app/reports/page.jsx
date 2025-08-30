"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/shared/header"
import { PageHeader } from "@/components/shared/page-header"
import { AlertTriangle, Upload, X } from "lucide-react"

export default function ReportsPage() {
  const [selectedFort, setSelectedFort] = useState("")
  const [issueCategory, setIssueCategory] = useState("")
  const [urgency, setUrgency] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState([])

  const forts = ["Raigad Fort", "Shivneri Fort", "Pratapgad Fort", "Sinhagad Fort", "Rajgad Fort", "Torna Fort"]

  const categories = [
    "Structural Damage",
    "Safety Hazard",
    "Cleanliness Issue",
    "Vandalism",
    "Access Problem",
    "Maintenance Required",
    "Other",
  ]

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("[v0] Report submitted:", {
      fort: selectedFort,
      category: issueCategory,
      urgency,
      description,
      location,
      images: images.length,
    })
    alert("Report submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Report an Issue"
          description="Help us preserve our heritage by reporting maintenance issues or concerns"
        />

        <div className="max-w-2xl mx-auto">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent-foreground" />
                Submit Issue Report
              </CardTitle>
              <CardDescription>Provide detailed information about the issue you've observed</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fort Selection */}
                <div className="space-y-2">
                  <Label htmlFor="fort">Select Fort *</Label>
                  <Select value={selectedFort} onValueChange={setSelectedFort} required>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Choose a fort" />
                    </SelectTrigger>
                    <SelectContent>
                      {forts.map((fort) => (
                        <SelectItem key={fort} value={fort}>
                          {fort}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Issue Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select value={issueCategory} onValueChange={setIssueCategory} required>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Urgency Level */}
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={urgency} onValueChange={setUrgency} required>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor issue</SelectItem>
                      <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                      <SelectItem value="high">High - Urgent attention needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location within Fort */}
                <div className="space-y-2">
                  <Label htmlFor="location">Specific Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Main gate, Watchtower, Courtyard..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Issue Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-input border-border min-h-[100px]"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Upload Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Click to upload images</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>

                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {images.map((image) => (
                        <div key={image.id} className="relative">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded-lg border border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 p-0"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!selectedFort || !issueCategory || !urgency || !description}
                >
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
