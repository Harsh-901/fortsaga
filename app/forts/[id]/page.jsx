"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Camera,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Mountain,
  Sword,
  Crown,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FortDetails() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [fort, setFort] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFort() {
      try {
        const res = await fetch(`/api/forts/${params.id}`)
        if (!res.ok) {
          throw new Error("Failed to fetch fort details")
        }
        const data = await res.json()
        setFort(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchFort()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading fort details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Mountain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Fort Not Found</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Link href="/forts">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Forts
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!fort) {
    return null
  }

  // Default values for missing fields
  const defaultFort = {
    name: "Unknown Fort",
    location: "Unknown Location",
    description: "No description available",
    "historical significance": "Historical significance not available",
    image_url: "/placeholder.svg",
    images: ["/placeholder.svg"],
    "trek difficulty": "Moderate",
    visitTime: "4-5 hours",
    bestSeason: "October to March",
    elevation: "N/A",
    "built by": "Unknown",
    "built year": "Unknown",
    rating: 4.5,
    visitors: "N/A",
    "key features": [],
    timeline: [],
    architecture: {
      style: "Traditional Fort Architecture",
      features: ["Stone walls", "Strategic location"],
      materials: "Stone and mortar",
      defenses: "Walls and natural barriers",
    },
    battles: [],
    visitInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "₹25 for Indians",
      facilities: ["Parking"],
      howToReach: "Local transportation",
    },
    "historical period": "Unknown Era",
    significance: "Historical significance not available",
    image: "/placeholder.svg",
    visittime: "4-5 hours",
    bestseason: "October to March",
    keyFeatures: [],
    visitingHours: "6:00 AM - 6:00 PM",
    entryFee: 25,
    bestTimeToVisit: "October to March",
    accessibility: "Trek required",
    nearestRailway: "N/A",
    nearestAirport: "N/A",
    accommodation: "Limited",
  }

  // Merge with defaults, but handle null/undefined arrays properly
  const fortData = { ...defaultFort, ...fort }

  // Ensure images is always an array
  if (!fortData.images || !Array.isArray(fortData.images)) {
    fortData.images = ["/placeholder.svg"]
  }

  // Ensure highlights is always an array
  if (!fortData.highlights || !Array.isArray(fortData.highlights)) {
    fortData.highlights = []
  }

  // Ensure battles is always an array
  if (!fortData.battles || !Array.isArray(fortData.battles)) {
    fortData.battles = []
  }

  // Ensure timeline is always an array
  if (!fortData.timeline || !Array.isArray(fortData.timeline)) {
    fortData.timeline = []
  }

  const relatedForts = [
    {
      id: "e39e0687-bc17-43de-bc7d-3b57a70e453e",
      name: "Shivneri Fort",
      location: "Pune, Maharashtra",
      image: "https://picsum.photos/200/150",
      significance: "Birthplace of Shivaji Maharaj",
    },
    {
      id: "9e8e9c23-3a93-455b-9b5b-3baf5003f1bf",
      name: "Pratapgad Fort",
      location: "Satara, Maharashtra",
      image: "https://picsum.photos/200/150",
      significance: "Site of Afzal Khan Battle",
    },
  ]

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      Easy: "bg-green-100 text-green-800 border-green-200",
      Moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Challenging: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[difficulty] || variants["Moderate"]
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % fortData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + fortData.images.length) % fortData.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/forts"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Forts
              </Link>
            </div>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">FortSaga</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-video md:aspect-[21/9] relative overflow-hidden">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Suvela_machi%2CRajgad_fort%2C_Maharashtra%2CIndia_July2015.jpg" alt={fortData.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{fortData.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{fortData.location}</span>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">{fortData["historical significance"] || fortData.significance}</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span>{fortData.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{fortData.visitors}</span>
                    </div>
                    <Badge className={getDifficultyBadge(fortData["trek difficulty"])}>{fortData["trek difficulty"]}</Badge>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Plan Visit</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="visit">Visit Info</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">About {fortData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">{fortData.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Highlights</h4>
                        <div className="space-y-2">
                          {(Array.isArray(fortData.key_features)
                            ? fortData.key_features
                            : (fortData.key_features ? fortData.key_features.split(',').map(f => f.trim()) : [])
                          ).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Quick Facts</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Built by:</span>
                            <span className="text-foreground">{fortData["built_by"]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Year:</span>
                            <span className="text-foreground">{fortData["built_year"]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Altitude:</span>
                            <span className="text-foreground">{fortData.elevation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Era:</span>
                            <span className="text-foreground">{fortData["historical_period"]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>

              <div className="space-y-6">


                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Related Forts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedForts.map((relatedFort) => (
                      <Link key={relatedFort.id} href={`/forts/${relatedFort.id}`}>
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                          <img
                            src={fortData.images && fortData.images.length > 0 ? fortData.images[0] : "https://upload.wikimedia.org/wikipedia/commons/4/49/Suvela_machi%2CRajgad_fort%2C_Maharashtra%2CIndia_July2015.jpg"}
                            alt={relatedFort.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{relatedFort.name}</h4>
                            <p className="text-xs text-muted-foreground mb-1">{relatedFort.location}</p>
                            <p className="text-xs text-muted-foreground">{relatedFort.significance}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Photo Gallery</h2>
              <p className="text-muted-foreground">Explore {fortData.name} through stunning photography</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fortData.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(index)
                    setLightboxOpen(true)
                  }}
                >
                  <img
                    src={fortData.images && fortData.images.length > 0 ? fortData.images[0] : "https://upload.wikimedia.org/wikipedia/commons/4/49/Suvela_machi%2CRajgad_fort%2C_Maharashtra%2CIndia_July2015.jpg"}
                    alt={`${fortData.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative max-w-4xl max-h-full">
                  <img
                    src={fortData.images && fortData.images.length > 0 ? fortData.images[0] : "https://upload.wikimedia.org/wikipedia/commons/4/49/Suvela_machi%2CRajgad_fort%2C_Maharashtra%2CIndia_July2015.jpg"}
                    alt={`${fortData.name} - Image ${selectedImage + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Historical Significance</h2>
              <p className="text-muted-foreground">Discover the rich history and cultural importance of {fortData.name}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Crown className="w-5 h-5 text-primary" />
                    Royal Heritage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {fortData.name} served as the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. The fort
                    witnessed the historic coronation ceremony in 1674, marking the formal establishment of the Maratha
                    Empire. The architectural grandeur and strategic location made it an ideal center of power for the
                    emerging Maratha state.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Sword className="w-5 h-5 text-primary" />
                    Military Significance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    The fort's strategic position provided excellent defense capabilities and served as a military
                    stronghold. Its natural fortifications, combined with man-made defenses, made it nearly impregnable.
                    The fort controlled important trade routes and served as a base for military campaigns across the
                    Deccan.
                  </p>
                </CardContent>
              </Card>
            </div>

            {fortData.battles.length > 0 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Notable Battles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fortData.battles.map((battle, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <h4 className="font-semibold text-foreground mb-2">{battle.name}</h4>
                        <p className="text-muted-foreground text-sm mb-2">{battle.description}</p>
                        <p className="text-xs text-muted-foreground italic">{battle.significance}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Architectural Marvel</h2>
              <p className="text-muted-foreground">
                Explore the unique architectural features and engineering brilliance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Architectural Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-foreground">Style: </span>
                    <span className="text-muted-foreground">{fortData.architecture?.style || "Traditional Fort Architecture"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Materials: </span>
                    <span className="text-muted-foreground">{fortData.architecture?.materials || "Stone and mortar"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Defenses: </span>
                    <span className="text-muted-foreground">{fortData.architecture?.defenses || "Walls and natural barriers"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fortData.architecture?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visit Info Tab */}
          <TabsContent value="visit" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Plan Your Visit</h2>
              <p className="text-muted-foreground">Everything you need to know for visiting {fortData.name}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Visiting Hours & Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-foreground">Timings: </span>
                    <span className="text-muted-foreground">{fortData.visitingHours || "6:00 AM - 6:00 PM"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Entry Fee: </span>
                    <span className="text-muted-foreground">{fortData.entryFee ? `₹${fortData.entryFee}` : "₹25 for Indians"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">How to Reach: </span>
                    <span className="text-muted-foreground">{fortData.howToReach || "Local transportation"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Facilities Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {fortData.visitInfo?.facilities?.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-muted-foreground text-sm">{facility}</span>
                      </div>
                    )) || (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-muted-foreground text-sm">Parking</span>
                          </div>
                        </>
                      )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Tips for Visitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">What to Bring</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Comfortable walking shoes</li>
                      <li>• Water bottle and snacks</li>
                      <li>• Camera for photography</li>
                      <li>• Sun protection (hat, sunscreen)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Best Time to Visit</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Early morning for cooler weather</li>
                      <li>• Avoid monsoon season (June-September)</li>
                      <li>• Winter months offer best experience</li>
                      <li>• Sunset views are spectacular</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
