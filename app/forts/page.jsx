"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FortExplorerHeader } from "@/components/shared/header"
import { MapPin, Search, Grid, List, Users, Star, Clock, Mountain } from "lucide-react"
import Link from "next/link"

export default function FortsExplorer() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [eraFilter, setEraFilter] = useState("all")
  const [forts, setForts] = useState([])

  useEffect(() => {
    async function fetchForts() {
      try {
        const res = await fetch("/api/forts")
        if (!res.ok) {
          throw new Error("Failed to fetch forts")
        }
        const data = await res.json()
        setForts(data)
      } catch (error) {
        console.error("Error fetching forts:", error)
      }
    }
    fetchForts()
  }, [])

  const filteredForts = forts.filter((fort) => {
    const matchesSearch =
      fort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fort.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fort.historicalSignificance || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || fort.location.includes(locationFilter)
    const matchesEra = eraFilter === "all" || (fort.historicalPeriod || "").includes(eraFilter)
    return matchesSearch && matchesLocation && matchesEra
  })

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      Easy: "bg-green-100 text-green-800 border-green-200",
      Moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Challenging: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[difficulty] || variants["Moderate"]
  }

  return (
    <div className="min-h-screen bg-background">
      <FortExplorerHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Historic Forts</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Discover the magnificent forts of Chhatrapati Shivaji Maharaj. Each fort tells a story of valor, strategy,
            and the rich heritage of the Maratha Empire.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search forts by name, location, or significance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          <div className="flex gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Raigad">Raigad</SelectItem>
                <SelectItem value="Satara">Satara</SelectItem>
              </SelectContent>
            </Select>

            <Select value={eraFilter} onValueChange={setEraFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="Era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Eras</SelectItem>
                <SelectItem value="maratha">Maratha Empire</SelectItem>
                <SelectItem value="mughal">Mughal Period</SelectItem>
                <SelectItem value="british">British Period</SelectItem>
                <SelectItem value="ancient">Ancient Period</SelectItem>
                <SelectItem value="medieval">Medieval Period</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredForts.length} of {forts.length} forts
          </p>
        </div>

        {/* Forts Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredForts.map((fort) => (
              <Card key={fort.id} className="border-border hover:shadow-lg transition-shadow group">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={fort.image_url || "/placeholder.svg"}
                    alt={fort.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getDifficultyBadge(fort.trekDifficulty)}>{fort.trekDifficulty}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {fort.rating || 4.5}
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-foreground mb-2">{fort.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mb-2">
                        <MapPin className="w-4 h-4" />
                        {fort.location}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {fort.historicalSignificance}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{fort.description}</p>

                  {/* Removed visit information box in grid view */}

                  <Link href={`/forts/${fort.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Explore Fort
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredForts.map((fort) => (
              <Card key={fort.id} className="border-border hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 aspect-video md:aspect-square relative overflow-hidden">
                    <img
                      src={fort.image || "/placeholder.svg"}
                      alt={fort.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{fort.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{fort.location}</span>
                          <Badge variant="outline" className="ml-2">
                            {fort.era}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-yellow-500" />
                            <span className="text-sm font-medium">{fort.rating}</span>
                          </div>
                          <Badge className={getDifficultyBadge(fort.difficulty)}>{fort.difficulty}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{fort.description}</p>

                    {/* Removed visit information box in list view */}
                    {/* Removed historical timeline (Key Highlights) section */}

                    <Link href={`/forts/${fort.id}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Explore Fort Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredForts.length === 0 && (
          <div className="text-center py-12">
            <Mountain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No forts found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
