"use client"

import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function FortDetails() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Mock fort data - in real app this would come from API
  const fort = {
    id: params.id,
    name: "Raigad Fort",
    location: "Raigad, Maharashtra",
    era: "17th Century",
    significance: "Capital of Maratha Empire",
    description:
      "The majestic capital of the Maratha Empire and coronation place of Chhatrapati Shivaji Maharaj. This hill fort stands as a testament to Maratha architectural brilliance and strategic planning.",
    images: [
      "/historic-fort-on-mountain.png",
      "/ancient-fort-with-stone-walls.png",
      "/hilltop-fort-with-battlements.png",
      "/fort-entrance-gate-with-stone-architecture.png",
      "/ancient-fort-courtyard-with-pillars.png",
      "/fort-watchtower-overlooking-valley.png",
    ],
    difficulty: "Moderate",
    visitTime: "4-5 hours",
    bestSeason: "October to March",
    altitude: "2,700 feet",
    builtBy: "Chhatrapati Shivaji Maharaj",
    yearBuilt: "1656",
    rating: 4.8,
    visitors: "50K+ annually",
    highlights: ["Coronation Throne", "Jagdishwar Temple", "Queen's Quarters", "Royal Palace", "Hirakani Buruj"],
    timeline: [
      {
        year: "1656",
        event: "Fort construction begins under Shivaji Maharaj",
        description: "Strategic location chosen for the new capital of the emerging Maratha Empire",
      },
      {
        year: "1674",
        event: "Coronation of Chhatrapati Shivaji Maharaj",
        description: "Historic coronation ceremony establishing the Maratha Empire officially",
      },
      {
        year: "1680",
        event: "Death of Shivaji Maharaj at Raigad",
        description: "The great Maratha king breathed his last at his beloved capital",
      },
      {
        year: "1689",
        event: "Capture by Mughal forces",
        description: "Fort falls to Aurangzeb's forces, marking end of an era",
      },
    ],
    architecture: {
      style: "Maratha Hill Fort Architecture",
      features: ["Stone masonry", "Strategic positioning", "Water conservation systems", "Multiple defense levels"],
      materials: "Local stone, lime mortar",
      defenses: "Natural cliff faces, fortified gates, watchtowers",
    },
    battles: [
      {
        name: "Siege of Raigad (1689)",
        description: "Mughal forces under Zulfiqar Khan captured the fort after a prolonged siege",
        significance: "Marked the temporary decline of Maratha power",
      },
    ],
    visitInfo: {
      timings: "6:00 AM - 6:00 PM",
      entryFee: "₹25 for Indians, ₹300 for foreigners",
      facilities: ["Parking", "Restrooms", "Food stalls", "Guide services"],
      howToReach: "Take Mahad-Poladpur road, then ropeway or trek from Pachad village",
    },
  }

  const relatedForts = [
    {
      id: "shivneri",
      name: "Shivneri Fort",
      location: "Pune, Maharashtra",
      image: "/ancient-fort-with-stone-walls.png",
      significance: "Birthplace of Shivaji Maharaj",
    },
    {
      id: "pratapgad",
      name: "Pratapgad Fort",
      location: "Satara, Maharashtra",
      image: "/hilltop-fort-with-battlements.png",
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
    setSelectedImage((prev) => (prev + 1) % fort.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + fort.images.length) % fort.images.length)
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
          <img src={fort.images[0] || "/placeholder.svg"} alt={fort.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{fort.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">{fort.location}</span>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">{fort.significance}</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span>{fort.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{fort.visitors}</span>
                    </div>
                    <Badge className={getDifficultyBadge(fort.difficulty)}>{fort.difficulty}</Badge>
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
                    <CardTitle className="text-foreground">About {fort.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">{fort.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Highlights</h4>
                        <div className="space-y-2">
                          {fort.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Quick Facts</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Built by:</span>
                            <span className="text-foreground">{fort.builtBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Year:</span>
                            <span className="text-foreground">{fort.yearBuilt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Altitude:</span>
                            <span className="text-foreground">{fort.altitude}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Era:</span>
                            <span className="text-foreground">{fort.era}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Historical Timeline</CardTitle>
                    <CardDescription>Key events in the fort's history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {fort.timeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-primary rounded-full" />
                            {index < fort.timeline.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{event.year}</Badge>
                            </div>
                            <h4 className="font-semibold text-foreground mb-2">{event.event}</h4>
                            <p className="text-muted-foreground text-sm">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Visit Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">Visit Duration</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{fort.visitTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">Best Season</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{fort.bestSeason}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mountain className="w-4 h-4 text-primary" />
                        <span className="font-medium text-foreground">Difficulty</span>
                      </div>
                      <Badge className={getDifficultyBadge(fort.difficulty)}>{fort.difficulty}</Badge>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Related Forts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedForts.map((relatedFort) => (
                      <Link key={relatedFort.id} href={`/forts/${relatedFort.id}`}>
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                          <img
                            src={relatedFort.image || "/placeholder.svg"}
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
              <p className="text-muted-foreground">Explore {fort.name} through stunning photography</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fort.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(index)
                    setLightboxOpen(true)
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${fort.name} - Image ${index + 1}`}
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
                    src={fort.images[selectedImage] || "/placeholder.svg"}
                    alt={`${fort.name} - Image ${selectedImage + 1}`}
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
              <p className="text-muted-foreground">Discover the rich history and cultural importance of {fort.name}</p>
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
                    {fort.name} served as the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. The fort
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

            {fort.battles.length > 0 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Notable Battles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fort.battles.map((battle, index) => (
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
                    <span className="text-muted-foreground">{fort.architecture.style}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Materials: </span>
                    <span className="text-muted-foreground">{fort.architecture.materials}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Defenses: </span>
                    <span className="text-muted-foreground">{fort.architecture.defenses}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fort.architecture.features.map((feature, index) => (
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
              <p className="text-muted-foreground">Everything you need to know for visiting {fort.name}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Visiting Hours & Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium text-foreground">Timings: </span>
                    <span className="text-muted-foreground">{fort.visitInfo.timings}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Entry Fee: </span>
                    <span className="text-muted-foreground">{fort.visitInfo.entryFee}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">How to Reach: </span>
                    <span className="text-muted-foreground">{fort.visitInfo.howToReach}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Facilities Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {fort.visitInfo.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-muted-foreground text-sm">{facility}</span>
                      </div>
                    ))}
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
