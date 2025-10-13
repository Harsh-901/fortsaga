"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LearningHeader } from "@/components/shared/header"
import { useSupabase } from "@/lib/supabase"
import { BookOpen, Search, Clock, User, Calendar, Crown, Sword, Mountain, Scroll, Users, Star } from "lucide-react"

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const articles = [
    {
      id: "shivaji-maharaj-legacy",
      title: "The Enduring Legacy of Chhatrapati Shivaji Maharaj",
      excerpt:
        "Explore how Shivaji Maharaj's vision and leadership shaped the Maratha Empire and influenced Indian history for centuries to come.",
      content: "Chhatrapati Shivaji Maharaj, born in 1630 at Shivneri Fort, was a visionary leader whose impact on Indian history transcends centuries. His innovative administrative system, known as the Ashta Pradhan, laid the foundation for efficient governance. Shivaji's emphasis on Swarajya (self-rule) inspired generations and challenged the Mughal hegemony. He established a navy, promoted religious tolerance, and implemented welfare measures for his subjects. His legacy continues to inspire leaders worldwide, symbolizing courage, strategic brilliance, and unwavering commitment to justice and equality.",
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
      content: "Maratha fort architecture represents a pinnacle of defensive engineering. Built on hilltops with natural barriers, these forts featured multiple layers of walls, bastions, and machicolations. The strategic placement of gates, often with right-angle bends to prevent elephant charges, showcased tactical brilliance. Water management systems ensured self-sufficiency during sieges, while secret passages and escape routes added to their impregnability. The integration of natural terrain with man-made structures created fortresses that were both beautiful and formidable, standing as testaments to Maratha ingenuity.",
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
      content: "Shivaji Maharaj revolutionized warfare with his guerrilla tactics, turning the odds against the numerically superior Mughal forces. His 'lightning raids' involved swift attacks on enemy supply lines, followed by quick retreats to fortified positions. The use of local terrain knowledge gave Maratha warriors a decisive advantage. Shivaji's intelligence network provided crucial information, enabling preemptive strikes. His emphasis on mobility, with cavalry units trained for rapid maneuvers, kept the enemy off-balance. These tactics not only secured victories but also minimized casualties, setting a precedent for asymmetric warfare that influenced military strategies worldwide.",
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
      content: "The Maratha Empire was shaped by extraordinary women who defied societal norms and contributed significantly to its success. Jijabai, Shivaji's mother, instilled values of courage and independence, guiding her son through early challenges. Ahilyabai Holkar, the enlightened ruler of Indore, rebuilt temples and promoted education. Tarabai, Shivaji's daughter-in-law, led armies and governed during turbulent times. These women managed estates, led diplomatic missions, and even commanded troops, proving that leadership transcends gender. Their stories highlight the progressive aspects of Maratha society and inspire women across generations.",
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
      content: "Preserving Maharashtra's historic forts requires a delicate balance between conservation and tourism. Modern techniques like laser scanning document structures before restoration, while traditional materials and methods ensure authenticity. Community involvement is crucial, with local residents participating in maintenance. Government initiatives, coupled with private partnerships, fund restoration projects. Challenges include weathering, encroachment, and balancing accessibility with protection. Successful conservation not only preserves history but also boosts local economies through heritage tourism, ensuring these magnificent structures continue to inspire future generations.",
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
      content: "Shivaji Maharaj's vision extended beyond land to establish maritime supremacy. Recognizing the importance of sea power, he built a formidable navy that controlled the western coastline. His shipbuilding program produced sturdy vessels capable of withstanding monsoons. Strategic ports like Vijayadurg became naval bases, while skilled commanders like Kanhoji Angre expanded Maratha influence. The navy protected trade routes, prevented invasions, and even launched offensive operations against European powers. This maritime legacy demonstrated Shivaji's comprehensive approach to statecraft and military strategy.",
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
      content: "In 1666, Shivaji Maharaj found himself imprisoned in Agra Fort under Mughal custody. Disguised as a sadhu, with his son Sambhaji and a few loyal followers, Shivaji orchestrated a daring escape. Using baskets of sweets to smuggle out his companions, he waited for the right moment. During a festival, chaos ensued, allowing Shivaji to slip away. Pursued relentlessly, he evaded capture through wit and courage. This legendary escape not only saved his life but also boosted Maratha morale and became a symbol of resistance against Mughal dominance.",
      duration: "15 min read",
      difficulty: "Beginner",
      image: "/historic-fort-on-mountain.png",
    },
    {
      id: "battle-of-pratapgad",
      title: "The Battle of Pratapgad",
      summary: "The legendary encounter between Shivaji Maharaj and Afzal Khan that changed history",
      content: "The Battle of Pratapgad in 1659 was a pivotal moment in Maratha history. Afzal Khan, a formidable Mughal general, was sent to eliminate the young Shivaji. In a treacherous meeting, Afzal Khan attempted to assassinate Shivaji with a hidden dagger. Shivaji, wearing armor, survived and counterattacked with his tiger claws, killing Afzal Khan. The Maratha forces then routed the Mughal army. This victory established Shivaji's reputation as a brilliant tactician and marked the rise of Maratha power in the Deccan.",
      duration: "12 min read",
      difficulty: "Intermediate",
      image: "/hilltop-fort-with-battlements.png",
    },
    {
      id: "coronation-at-raigad",
      title: "The Coronation at Raigad",
      summary: "The grand ceremony that established the Maratha Empire and crowned Shivaji as Chhatrapati",
      content: "On June 6, 1674, at Raigad Fort, Shivaji was crowned Chhatrapati in a grand ceremony. Pandit Gaga Bhatt performed the rituals, declaring Shivaji as the sovereign ruler. The ceremony included Vedic chants, royal insignia, and blessings from priests. Dignitaries from across India attended, acknowledging Shivaji's authority. This coronation formalized the Maratha Empire, with Shivaji adopting the title 'Chhatrapati' meaning 'Lord of the Umbrella'. It was a momentous event that united the Maratha clans under a single banner.",
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
                        <Dialog open={isDialogOpen && selectedArticle?.id === article.id} onOpenChange={(open) => {
                          setIsDialogOpen(open)
                          if (!open) {
                            setSelectedArticle(null)
                            setSelectedStory(null)
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => {
                              setSelectedArticle(article)
                              setSelectedStory(null)
                              setIsDialogOpen(true)
                            }}>
                              Read Article
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">{selectedArticle?.title}</DialogTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {selectedArticle?.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {selectedArticle?.readTime}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {selectedArticle?.publishDate}
                                </div>
                              </div>
                            </DialogHeader>
                            <div className="mt-6">
                              <p className="text-base leading-relaxed">{selectedArticle?.content}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
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
                        <Dialog open={isDialogOpen && selectedArticle?.id === article.id} onOpenChange={(open) => {
                          setIsDialogOpen(open)
                          if (!open) setSelectedArticle(null)
                        }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="w-full bg-transparent" onClick={() => {
                              setSelectedArticle(article)
                              setIsDialogOpen(true)
                            }}>
                              Read More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">{selectedArticle?.title}</DialogTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {selectedArticle?.author}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {selectedArticle?.readTime}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {selectedArticle?.publishDate}
                                </div>
                              </div>
                            </DialogHeader>
                            <div className="mt-6">
                              <p className="text-base leading-relaxed">{selectedArticle?.content}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
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
                    <Dialog open={isDialogOpen && selectedStory?.id === story.id} onOpenChange={(open) => {
                      setIsDialogOpen(open)
                      if (!open) {
                        setSelectedArticle(null)
                        setSelectedStory(null)
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => {
                          setSelectedStory(story)
                          setSelectedArticle(null)
                          setIsDialogOpen(true)
                        }}>
                          Read Story
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">{selectedStory?.title}</DialogTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {selectedStory?.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              Story
                            </div>
                            <Badge className={getDifficultyBadge(selectedStory?.difficulty)}>{selectedStory?.difficulty}</Badge>
                          </div>
                        </DialogHeader>
                        <div className="mt-6">
                          <p className="text-base leading-relaxed">{selectedStory?.content}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
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
