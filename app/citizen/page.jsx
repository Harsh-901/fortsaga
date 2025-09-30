"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CitizenHeader } from "@/components/shared/header";
import { PageHeader } from "@/components/shared/page-header";
import {
  MapPin,
  AlertTriangle,
  CheckCircle,
  Upload,
  X,
  Plus,
  Eye,
  Award,
  TrendingUp,
  Calendar,
  User,
  MessageSquare,
  Search,
  Bell,
  Settings,
  Heart,
  Star,
  Trophy,
  Users,
  Clock,
  Download,
  Share2,
  MapIcon,
  Navigation,
} from "lucide-react";
import Link from "next/link";

export default function CitizenDashboard() {
  // ---------------- STATE ----------------
  const [activeTab, setActiveTab] = useState("login"); // can switch between "login" and "register"
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const myReports = [
    { id: 1, title: "Illegal cutting", status: "Pending" },
    { id: 2, title: "Unhealthy tree", status: "Resolved" },
  ];
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userStats, setUserStats] = useState({
    reportsSubmitted: 0,
    reportsResolved: 0,
    contributionScore: 0,
    badgesEarned: 0,
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [reportForm, setReportForm] = useState({
    fort: "",
    category: "",
    location: "",
    description: "",
    urgency: "",
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [reportViewOpen, setReportViewOpen] = useState(false);
  const [badgesDialogOpen, setBadgesDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);
  const [reportFilter, setReportFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: "notif-001",
      type: "report_update",
      title: "Report Status Updated",
      message:
        "Your report RPT-001 at Raigad Fort has been assigned to an inspector",
      timestamp: "2024-01-20 10:30 AM",
      read: false,
      reportId: "RPT-001",
    },
    {
      id: "notif-002",
      type: "badge_earned",
      title: "New Badge Earned!",
      message: "Congratulations! You've earned the 'Heritage Guardian' badge",
      timestamp: "2024-01-19 3:45 PM",
      read: false,
      badgeId: "heritage-guardian",
    },
  ]);

  const [userProfile, setUserProfile] = useState({
    name: "Amit Sharma",
    email: "amit.sharma@email.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    joinDate: "2023-07-15",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      reportUpdates: true,
      communityUpdates: true,
      badgeNotifications: true,
    },
  });

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const newNotif = {
          id: `notif-${Date.now()}`,
          type: "report_update",
          title: "Report Status Updated",
          message: "Your report has been reviewed by our team",
          timestamp: new Date().toLocaleString(),
          read: false,
        };
        setNotifications((prev) => [newNotif, ...prev]);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- HANDLERS ----------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) =>
    setSelectedImages((prev) => prev.filter((img) => img.id !== id));

  const handleSubmitReport = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
    setReportForm({
      fort: "",
      category: "",
      location: "",
      description: "",
      urgency: "",
    });
    setSelectedImages([]);
  };

  const handleLogin = async () => {
    // Call your backend login API here
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    // Role-based redirection
    if (data.user.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else if (data.user.role === "citizen") {
      window.location.href = "/citizen/dashboard";
    } else {
      alert("Invalid role received");
    }
  };

  const handleRegister = async () => {
    // Call your backend registration API here
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("Registration successful! Please log in.");
      setActiveTab("login"); // Switch to login tab automatically
      setRegisterForm({ name: "", email: "", password: "" });
    }
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };
  return (
    <div className="min-h-screen bg-background">
      <CitizenHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <PageHeader
            title="Citizen Dashboard"
            description="Contribute to heritage conservation by reporting issues and tracking progress"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotificationsOpen(true)}
              className="relative"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setProfileSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="report">Report Issue</TabsTrigger>
            <TabsTrigger value="my-reports">My Reports</TabsTrigger>
            <TabsTrigger value="explore">Explore Forts</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Reports Submitted
                  </CardTitle>
                  <AlertTriangle className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {userStats.reportsSubmitted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total contributions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Reports Resolved
                  </CardTitle>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {userStats.reportsResolved}
                  </div>
                  <p className="text-xs text-green-600">Issues fixed</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Contribution Score
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {userStats.contributionScore}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Heritage points
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Badges Earned
                  </CardTitle>
                  <Award className="w-4 h-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {userStats.badgesEarned}
                  </div>
                  <p className="text-xs text-muted-foreground">Achievements</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks for heritage conservation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="h-20 flex-col bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleQuickAction("report")}
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      Report Issue
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-transparent"
                      onClick={() => handleQuickAction("explore")}
                    >
                      <MapPin className="w-6 h-6 mb-2" />
                      Explore Forts
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-transparent"
                      onClick={() => handleQuickAction("reports")}
                    >
                      <Eye className="w-6 h-6 mb-2" />
                      View Reports
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-transparent"
                      onClick={() => handleQuickAction("badges")}
                    >
                      <Award className="w-6 h-6 mb-2" />
                      My Badges
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myReports.slice(0, 3).map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {report.fort}
                            </span>
                            <Badge className={getStatusBadge(report.status)}>
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {report.issue}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {report.date}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Recent Achievements
                </CardTitle>
                <CardDescription>
                  Your latest badges and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userBadges
                    .filter((badge) => badge.earned)
                    .slice(0, 3)
                    .map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-3 p-3 bg-card/50 rounded-lg"
                      >
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <div className="font-medium text-foreground">
                            {badge.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {badge.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Earned {badge.earnedDate}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setBadgesDialogOpen(true)}
                  >
                    View All Badges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Issue Tab */}
          <TabsContent value="report" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Report an Issue
              </h2>
              <p className="text-muted-foreground">
                Help preserve our heritage by reporting maintenance issues,
                damage, or safety concerns
              </p>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Issue Report Form
                </CardTitle>
                <CardDescription>
                  Provide detailed information to help us address the issue
                  quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitReport} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fort">Select Fort *</Label>
                      <Select
                        value={reportForm.fort}
                        onValueChange={(value) =>
                          setReportForm({ ...reportForm, fort: value })
                        }
                      >
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Choose a fort" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="raigad">Raigad Fort</SelectItem>
                          <SelectItem value="shivneri">
                            Shivneri Fort
                          </SelectItem>
                          <SelectItem value="pratapgad">
                            Pratapgad Fort
                          </SelectItem>
                          <SelectItem value="rajgad">Rajgad Fort</SelectItem>
                          <SelectItem value="sinhagad">
                            Sinhagad Fort
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Issue Category *</Label>
                      <Select
                        value={reportForm.category}
                        onValueChange={(value) =>
                          setReportForm({ ...reportForm, category: value })
                        }
                      >
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="structural">
                            Structural Damage
                          </SelectItem>
                          <SelectItem value="safety">Safety Hazard</SelectItem>
                          <SelectItem value="cleanliness">
                            Cleanliness Issue
                          </SelectItem>
                          <SelectItem value="maintenance">
                            General Maintenance
                          </SelectItem>
                          <SelectItem value="vandalism">Vandalism</SelectItem>
                          <SelectItem value="accessibility">
                            Accessibility Issue
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Specific Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Main gate, Watchtower, Entrance stairs"
                        value={reportForm.location}
                        onChange={(e) =>
                          setReportForm({
                            ...reportForm,
                            location: e.target.value,
                          })
                        }
                        className="bg-input border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level *</Label>
                      <Select
                        value={reportForm.urgency}
                        onValueChange={(value) =>
                          setReportForm({ ...reportForm, urgency: value })
                        }
                      >
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            High - Immediate attention needed
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Should be addressed soon
                          </SelectItem>
                          <SelectItem value="low">
                            Low - Can be scheduled for later
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail. Include what you observed, when you noticed it, and any other relevant information..."
                      value={reportForm.description}
                      onChange={(e) =>
                        setReportForm({
                          ...reportForm,
                          description: e.target.value,
                        })
                      }
                      className="min-h-32 bg-input border-border"
                      required
                    />
                  </div>

                  <div className="space-y-4">
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
                        <p className="text-muted-foreground mb-2">
                          Click to upload images or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 10MB each
                        </p>
                      </label>
                    </div>

                    {selectedImages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">
                            Selected Images ({selectedImages.length})
                          </h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedImages([])}
                          >
                            Clear All
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedImages.map((image) => (
                            <div
                              key={image.id}
                              className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border"
                            >
                              <img
                                src={image.preview || "/placeholder.svg"}
                                alt="Upload preview"
                                className="w-16 h-16 object-cover rounded border border-border"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">
                                  {image.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {image.size}
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImage(image.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Submit Report
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setReportForm({
                          fort: "",
                          category: "",
                          location: "",
                          description: "",
                          urgency: "",
                        });
                        setSelectedImages([]);
                      }}
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Reports Tab */}
          <TabsContent value="my-reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  My Reports
                </h2>
                <p className="text-muted-foreground">
                  Track the status of your submitted reports
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setActiveTab("report")}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Select value={reportFilter} onValueChange={setReportFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Fort</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium text-foreground">
                        {report.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {report.fort}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {report.issue}
                      </TableCell>
                      <TableCell className="text-muted-foreground capitalize">
                        {report.category}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadge(report.urgency)}>
                          {report.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {report.date}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {filteredReports.length === 0 && (
              <Card className="border-border p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Reports Found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || reportFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "You haven't submitted any reports yet"}
                </p>
                <Button
                  onClick={() => setActiveTab("report")}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Your First Report
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Explore Forts Tab */}
          <TabsContent value="explore" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Explore Forts
              </h2>
              <p className="text-muted-foreground">
                Discover the magnificent forts of Chhatrapati Shivaji Maharaj
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Raigad Fort",
                  location: "Raigad, Maharashtra",
                  description:
                    "The capital of the Maratha Empire and coronation place of Chhatrapati Shivaji Maharaj",
                  image: "/historic-fort-on-mountain.png",
                  status: "Open",
                  difficulty: "Moderate",
                  duration: "4-5 hours",
                  elevation: "820m",
                },
                {
                  name: "Shivneri Fort",
                  location: "Pune, Maharashtra",
                  description:
                    "Birthplace of Chhatrapati Shivaji Maharaj, featuring ancient architecture",
                  image: "/ancient-fort-with-stone-walls.png",
                  status: "Open",
                  difficulty: "Easy",
                  duration: "2-3 hours",
                  elevation: "400m",
                },
                {
                  name: "Pratapgad Fort",
                  location: "Satara, Maharashtra",
                  description:
                    "Site of the famous battle between Shivaji and Afzal Khan",
                  image: "/hilltop-fort-with-battlements.png",
                  status: "Open",
                  difficulty: "Moderate",
                  duration: "3-4 hours",
                  elevation: "1080m",
                },
                {
                  name: "Sinhagad Fort",
                  location: "Pune, Maharashtra",
                  description:
                    "Famous for the brave sacrifice of Tanaji Malusare",
                  image: "/ancient-mountain-fort-with-multiple-levels.png",
                  status: "Open",
                  difficulty: "Easy",
                  duration: "2-3 hours",
                  elevation: "760m",
                },
                {
                  name: "Rajgad Fort",
                  location: "Pune, Maharashtra",
                  description:
                    "Former capital of the Maratha Empire before Raigad",
                  image: "/hilltop-fort-with-stone-walls-and-gates.png",
                  status: "Open",
                  difficulty: "Difficult",
                  duration: "6-7 hours",
                  elevation: "1376m",
                },
                {
                  name: "Lohagad Fort",
                  location: "Pune, Maharashtra",
                  description: "Iron fort known for its strong fortifications",
                  image: "/ancient-fort-on-steep-mountain-peak.png",
                  status: "Open",
                  difficulty: "Easy",
                  duration: "2-3 hours",
                  elevation: "1033m",
                },
              ].map((fort, index) => (
                <Card
                  key={index}
                  className="border-border hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={fort.image || "/placeholder.svg"}
                      alt={fort.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {fort.status}
                      </Badge>
                      {visitedForts.includes(fort.name) && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Visited
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => toggleFavoriteFort(fort.name)}
                      >
                        <Heart
                          className={`w-4 h-4 ${favoriteForts.includes(fort.name)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                            }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() =>
                          alert(
                            "Share functionality - This would open share options"
                          )
                        }
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center justify-between">
                      {fort.name}
                      {favoriteForts.includes(fort.name) && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {fort.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {fort.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {fort.difficulty}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {fort.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {fort.elevation}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapIcon className="w-3 h-3" />
                        Trek
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/forts/${fort.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          Learn More
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => {
                          setReportForm((prev) => ({
                            ...prev,
                            fort: fort.name,
                          }));
                          setActiveTab("report");
                        }}
                      >
                        Report Issue
                      </Button>
                    </div>

                    {!visitedForts.includes(fort.name) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 text-xs"
                        onClick={() => markFortAsVisited(fort.name)}
                      >
                        Mark as Visited
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Community</h2>
              <p className="text-muted-foreground">
                Connect with fellow heritage conservation enthusiasts
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Members
                  </CardTitle>
                  <Users className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {communityStats.totalMembers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Heritage guardians
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active This Month
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {communityStats.activeThisMonth}
                  </div>
                  <p className="text-xs text-green-600">Contributing members</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Reports
                  </CardTitle>
                  <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {communityStats.totalReports}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Community contributions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Issues Resolved
                  </CardTitle>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {communityStats.resolvedReports}
                  </div>
                  <p className="text-xs text-green-600">Heritage preserved</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Top Contributors
                </CardTitle>
                <CardDescription>
                  Community members making the biggest impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityStats.topContributors.map((contributor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {contributor.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {contributor.reports} reports submitted
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-accent-foreground" />
                        <span className="font-bold text-foreground">
                          {contributor.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={reportViewOpen} onOpenChange={setReportViewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report Details - {selectedReport?.id}</DialogTitle>
              <DialogDescription>
                Detailed information about your submitted report
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Fort
                    </label>
                    <p className="text-foreground font-medium">
                      {selectedReport.fort}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Location
                    </label>
                    <p className="text-foreground">{selectedReport.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Category
                    </label>
                    <p className="text-foreground capitalize">
                      {selectedReport.category}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Date Reported
                    </label>
                    <p className="text-foreground">{selectedReport.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <Badge className={getStatusBadge(selectedReport.status)}>
                      {selectedReport.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Urgency
                    </label>
                    <Badge className={getUrgencyBadge(selectedReport.urgency)}>
                      {selectedReport.urgency}
                    </Badge>
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Issue Description
                  </label>
                  <p className="text-foreground mt-1 p-3 bg-card/50 rounded-lg">
                    {selectedReport.description}
                  </p>
                </div>

                {/* Progress Timeline */}
                {selectedReport.timeline && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Progress Timeline
                    </label>
                    <div className="mt-2 space-y-3">
                      {selectedReport.timeline.map((entry, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${entry.status === "resolved"
                                  ? "bg-green-500"
                                  : entry.status === "in-progress"
                                    ? "bg-blue-500"
                                    : entry.status === "assigned"
                                      ? "bg-orange-500"
                                      : "bg-gray-400"
                                }`}
                            ></div>
                            {index < selectedReport.timeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-border mt-1"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">
                                {entry.action}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {entry.date}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              by {entry.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress Information */}
                {selectedReport.assignedTo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Assigned To
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p className="text-foreground">
                          {selectedReport.assignedTo}
                        </p>
                      </div>
                    </div>
                    {selectedReport.estimatedCompletion && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Estimated Completion
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p className="text-foreground">
                            {selectedReport.estimatedCompletion}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedReport.completedDate && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Completed Date
                        </label>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <p className="text-foreground">
                            {selectedReport.completedDate}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Admin Notes */}
                {selectedReport.adminNotes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Admin Updates
                    </label>
                    <div className="mt-1 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p className="text-blue-800">
                          {selectedReport.adminNotes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images */}
                {selectedReport.images && selectedReport.images.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Attached Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {selectedReport.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video relative overflow-hidden rounded-lg border border-border group"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Report image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => window.open(image, "_blank")}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setReportViewOpen(false)}
                  >
                    Close
                  </Button>
                  <Button onClick={() => window.print()}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Notifications
                {unreadNotifications > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllNotificationsAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </DialogTitle>
              <DialogDescription>
                Stay updated on your reports and community activities
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Notifications
                  </h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${notification.read
                        ? "bg-card/30 border-border"
                        : "bg-blue-50 border-blue-200"
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              markNotificationAsRead(notification.id)
                            }
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNotificationsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={profileSettingsOpen}
          onOpenChange={setProfileSettingsOpen}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Profile Settings</DialogTitle>
              <DialogDescription>
                Manage your account information and notification preferences
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={userProfile.location}
                      onChange={(e) =>
                        setUserProfile((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="bg-input border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </Label>
                  <p className="text-foreground">{userProfile.joinDate}</p>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  {Object.entries(userProfile.preferences).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <label className="text-sm font-medium text-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {key === "emailNotifications" &&
                              "Receive notifications via email"}
                            {key === "smsNotifications" &&
                              "Receive notifications via SMS"}
                            {key === "reportUpdates" &&
                              "Get updates on your report status"}
                            {key === "communityUpdates" &&
                              "Stay informed about community activities"}
                            {key === "badgeNotifications" &&
                              "Get notified when you earn new badges"}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              preferences: {
                                ...prev.preferences,
                                [key]: e.target.checked,
                              },
                            }))
                          }
                          className="w-4 h-4 rounded border-border"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setProfileSettingsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Profile settings saved successfully!");
                  setProfileSettingsOpen(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
