"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LearningHeader } from "@/components/shared/header"
import { BookOpen, Search, Clock, User, Calendar, Crown, Sword, Mountain, Scroll, Users, Star } from "lucide-react"

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const articles = [
    {
      id: "shivaji-maharaj-legacy",
      title: "The Enduring Legacy of Chhatrapati Shivaji Maharaj",
      excerpt:
        "Explore how Shivaji Maharaj's vision and leadership shaped the Maratha Empire and influenced Indian history for centuries to come.",
      category: "Biography",
      author: "Dr. Rajesh Khurana",
      readTime: "8 min read",
      publishDate: "2024-01-15",
      image: "/historic-fort-on-mountain.png",
      featured: true,
    },
    {
      id: "maratha-fort-architecture",
      title: "Architectural Marvels: Understanding Maratha Fort Design",
      excerpt:
        "Discover the unique architectural features and strategic design principles that made Maratha forts nearly impregnable.",
      category: "Architecture",
      author: "Prof. Meera Patil",
      readTime: "6 min read",
      publishDate: "2024-01-12",
      image: "/ancient-fort-with-stone-walls.png",
      featured: false,
    },
    {
      id: "guerrilla-warfare-tactics",
      title: "Guerrilla Warfare: Shivaji's Revolutionary Military Strategy",
      excerpt:
        "Learn about the innovative military tactics that helped a small Maratha force challenge the mighty Mughal Empire.",
      category: "Military History",
      author: "Col. Vikram Singh",
      readTime: "10 min read",
      publishDate: "2024-01-10",
      image: "/hilltop-fort-with-battlements.png",
      featured: true,
    },
    {
      id: "women-in-maratha-empire",
      title: "Powerful Women of the Maratha Empire",
      excerpt:
        "Celebrate the remarkable women who played crucial roles in the Maratha Empire, from Jijabai to Tarabai.",
      category: "Social History",
      author: "Dr. Sunita Deshpande",
      readTime: "7 min read",
      publishDate: "2024-01-08",
      image: "/ancient-fort-courtyard-with-pillars.png",
      featured: false,
    },
    {
      id: "fort-conservation-efforts",
      title: "Modern Conservation: Preserving Our Heritage",
      excerpt:
        "Understanding current efforts to preserve and restore Maharashtra's historic forts for future generations.",
      category: "Conservation",
      author: "Amit Sharma",
      readTime: "5 min read",
      publishDate: "2024-01-05",
      image: "/fort-entrance-gate-with-stone-architecture.png",
      featured: false,
    },
    {
      id: "maratha-navy-history",
      title: "Masters of the Sea: The Maratha Naval Legacy",
      excerpt: "Explore how Shivaji Maharaj built a formidable naval force that dominated the western coast of India.",
      category: "Military History",
      author: "Capt. Pradeep Kulkarni",
      readTime: "9 min read",
      publishDate: "2024-01-03",
      image: "/fort-watchtower-overlooking-valley.png",
      featured: false,
    },
  ]

  const stories = [
    {
      id: "escape-from-agra",
      title: "The Great Escape from Agra",
      summary: "The thrilling tale of how Shivaji Maharaj escaped from Aurangzeb's captivity in Agra",
      duration: "15 min read",
      difficulty: "Beginner",
      image: "/historic-fort-on-mountain.png",
    },
    {
      id: "battle-of-pratapgad",
      title: "The Battle of Pratapgad",
      summary: "The legendary encounter between Shivaji Maharaj and Afzal Khan that changed history",
      duration: "12 min read",
      difficulty: "Intermediate",
      image: "/hilltop-fort-with-battlements.png",
    },
    {
      id: "coronation-at-raigad",
      title: "The Coronation at Raigad",
      summary: "The grand ceremony that established the Maratha Empire and crowned Shivaji as Chhatrapati",
      duration: "10 min read",
      difficulty: "Beginner",
      image: "/ancient-fort-with-stone-walls.png",
    },
  ]

  const timeline = [
    {
      year: "1630",
      event: "Birth of Shivaji",
      description: "Born at Shivneri Fort to Shahaji Bhosale and Jijabai",
      significance: "Beginning of a legend",
    },
    {
      year: "1646",
      event: "Capture of Torna Fort",
      description: "16-year-old Shivaji captures his first fort, marking the start of his military career",
      significance: "First step towards empire building",
    },
    {
      year: "1659",
      event: "Battle of Pratapgad",
      description: "Decisive victory over Afzal Khan establishes Maratha power",
      significance: "Turning point in Deccan politics",
    },
    {
      year: "1674",
      event: "Coronation at Raigad",
      description: "Shivaji is crowned as Chhatrapati, formally establishing the Maratha Empire",
      significance: "Birth of the Maratha Empire",
    },
    {
      year: "1680",
      event: "Death of Shivaji Maharaj",
      description: "The great king passes away at Raigad Fort",
      significance: "End of an era, beginning of a legacy",
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getCategoryBadge = (category) => {
    const variants = {
      Biography: "bg-blue-100 text-blue-800 border-blue-200",
      Architecture: "bg-green-100 text-green-800 border-green-200",
      "Military History": "bg-red-100 text-red-800 border-red-200",
      "Social History": "bg-purple-100 text-purple-800 border-purple-200",
      Conservation: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return variants[category] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getDifficultyBadge = (difficulty) => {
    const variants = {
      Beginner: "bg-green-100 text-green-800 border-green-200",
      Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Advanced: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[difficulty] || variants["Beginner"]
  }

  return (
    <div className="min-h-screen bg-background">
      <LearningHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Learn About Our Heritage</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Discover the rich history, culture, and significance of Chhatrapati Shivaji Maharaj's forts through engaging
            articles, stories, and interactive content.
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="quiz">Interactive</TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-8">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 bg-input border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Biography">Biography</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                  <SelectItem value="Military History">Military History</SelectItem>
                  <SelectItem value="Social History">Social History</SelectItem>
                  <SelectItem value="Conservation">Conservation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Articles */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {filteredArticles
                  .filter((article) => article.featured)
                  .map((article) => (
                    <Card key={article.id} className="border-border hover:shadow-lg transition-shadow group">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={getCategoryBadge(article.category)}>{article.category}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-foreground line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.publishDate}
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Read Article
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All Articles */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles
                  .filter((article) => !article.featured)
                  .map((article) => (
                    <Card key={article.id} className="border-border hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={getCategoryBadge(article.category)} size="sm">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-foreground line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm">{article.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Legendary Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in the epic tales of courage, strategy, and heroism from the Maratha Empire
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <Card key={story.id} className="border-border hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={getDifficultyBadge(story.difficulty)}>{story.difficulty}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-foreground">{story.title}</CardTitle>
                    <CardDescription>{story.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {story.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Story
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Read Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Historical Timeline</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow the key events in the life of Chhatrapati Shivaji Maharaj and the rise of the Maratha Empire
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timeline.map((event, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                      {index < timeline.length - 1 && <div className="w-px h-24 bg-border mt-4" />}
                    </div>
                    <Card className="flex-1 border-border">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                          <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">{event.year}</Badge>
                          <CardTitle className="text-foreground">{event.event}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-accent-foreground" />
                          <span className="italic">{event.significance}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Interactive Tab */}
          <TabsContent value="quiz" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Interactive Learning</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Test your knowledge and learn through engaging quizzes and interactive content
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crown className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-foreground mb-4">Maratha Empire Quiz</CardTitle>
                <CardDescription className="mb-6">
                  Test your knowledge about the Maratha Empire and Shivaji Maharaj
                </CardDescription>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Quiz</Button>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mountain className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground mb-4">Fort Architecture</CardTitle>
                <CardDescription className="mb-6">
                  Learn about the unique features of Maratha fort architecture
                </CardDescription>
                <Button variant="outline">Coming Soon</Button>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sword className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-foreground mb-4">Battle Strategies</CardTitle>
                <CardDescription className="mb-6">
                  Explore the military tactics and strategies used by Maratha warriors
                </CardDescription>
                <Button variant="outline">Coming Soon</Button>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Scroll className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground mb-4">Historical Documents</CardTitle>
                <CardDescription className="mb-6">
                  Explore original documents and letters from the Maratha period
                </CardDescription>
                <Button variant="outline">Coming Soon</Button>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-foreground mb-4">Virtual Tours</CardTitle>
                <CardDescription className="mb-6">
                  Take virtual tours of famous forts from the comfort of your home
                </CardDescription>
                <Button variant="outline">Coming Soon</Button>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow text-center p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-foreground mb-4">Study Guides</CardTitle>
                <CardDescription className="mb-6">
                  Comprehensive study materials for students and researchers
                </CardDescription>
                <Button variant="outline">Coming Soon</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
