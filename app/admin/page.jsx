"use client"
import Link from "next/link";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PageHeader } from "@/components/shared/page-header"
import {
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Edit,
  Eye,
  Calendar,
  Camera,
  FileText,
  Upload,
  X,
  Download,
  Trash2,
  Grid,
  List,
  Play,
  ImageIcon,
  Video,
  File,
  CalendarDays,
  User,
  ClipboardList,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = useSupabase()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")

  // Forts state
  const [forts, setForts] = useState([])
  const [fortsLoading, setFortsLoading] = useState(true)
  const [fortsError, setFortsError] = useState(null)

  const [showScheduleInspectionDialog, setShowScheduleInspectionDialog] = useState(false)
  const [inspectionForm, setInspectionForm] = useState({
    fort: "",
    inspectionType: "",
    inspector: "",
    date: "",
    time: "",
    duration: "2",
    priority: "medium",
    description: "",
    checklist: [],
    equipment: "",
    notes: "",
  })

  const [scheduledInspections, setScheduledInspections] = useState([])
  const [inspectionsLoading, setInspectionsLoading] = useState(true)
  const [inspectionsError, setInspectionsError] = useState(null)

  const inspectionTypes = [
    "Structural Assessment",
    "Conservation Review",
    "Safety Inspection",
    "Archaeological Survey",
    "Environmental Impact",
    "Maintenance Check",
    "Documentation Review",
    "Emergency Assessment",
  ]

  const inspectors = [
    "Dr. Rajesh Patil - Structural Engineer",
    "Prof. Meera Sharma - Conservation Expert",
    "Eng. Amit Kumar - Safety Inspector",
    "Dr. Priya Joshi - Archaeologist",
    "Mr. Suresh Rane - Maintenance Supervisor",
    "Dr. Kavita Desai - Heritage Specialist",
  ]

  const [showUploadMediaDialog, setShowUploadMediaDialog] = useState(false)
  const [mediaFiles, setMediaFiles] = useState([])
  const [mediaSearchTerm, setMediaSearchTerm] = useState("")
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all")
  const [mediaFortFilter, setMediaFortFilter] = useState("all")
  const [mediaViewMode, setMediaViewMode] = useState("grid")
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadForm, setUploadForm] = useState({
    files: [],
    fort: "",
    category: "",
    description: "",
    tags: "",
  })

  const [mediaLibrary, setMediaLibrary] = useState([])
  const [mediaLoading, setMediaLoading] = useState(true)
  const [mediaError, setMediaError] = useState(null)

  const [showAddFortDialog, setShowAddFortDialog] = useState(false)
  const [showViewFortDialog, setShowViewFortDialog] = useState(false)
  const [showEditFortDialog, setShowEditFortDialog] = useState(false)
  const [selectedFort, setSelectedFort] = useState(null)
  const [editFortForm, setEditFortForm] = useState({
    name: "",
    location: "",
    district: "",
    state: "Maharashtra",
    coordinates: "",
    builtBy: "",
    builtYear: "",
    historicalPeriod: "",
    fortType: "",
    elevation: "",
    area: "",
    description: "",
    historicalSignificance: "",
    architecture: "",
    keyFeatures: "",
    visitingHours: "",
    entryFee: "",
    accessibility: "",
    nearestRailway: "",
    nearestAirport: "",
    accommodation: "",
    bestTimeToVisit: "",
    trekDifficulty: "",
    images: [],
  })
  const [selectedInspection, setSelectedInspection] = useState(null)
  const [inspectionViewOpen, setInspectionViewOpen] = useState(false)
  const [fortForm, setFortForm] = useState({
    name: "",
    location: "",
    district: "",
    state: "Maharashtra",
    coordinates: "",
    builtBy: "",
    builtYear: "",
    historicalPeriod: "",
    fortType: "",
    elevation: "",
    area: "",
    description: "",
    historicalSignificance: "",
    architecture: "",
    keyFeatures: "",
    visitingHours: "",
    entryFee: "",
    accessibility: "",
    nearestRailway: "",
    nearestAirport: "",
    accommodation: "",
    bestTimeToVisit: "",
    trekDifficulty: "",
    images: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fortData = {
      name,
      location,
      description,
      image_url,
      created_by: userId, // pass the logged-in user's id
    };

    try {
      const res = await fetch("/api/forts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fortData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to add fort");

      alert("Fort added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };



  const [selectedReport, setSelectedReport] = useState(null)
  const [reportViewOpen, setReportViewOpen] = useState(false)
  const [reportEditOpen, setReportEditOpen] = useState(false)
  const [reportStatus, setReportStatus] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [reportNotes, setReportNotes] = useState("")
  const [selectedReports, setSelectedReports] = useState([])

  const [reportFilter, setReportFilter] = useState("all")
  const [reportSearch, setReportSearch] = useState("")
  const [reportHistory, setReportHistory] = useState({})
  const [recentReports, setRecentReports] = useState([])

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/reports");
        if (!res.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await res.json();
        setRecentReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

  // Fetch forts from Supabase
  useEffect(() => {
    async function fetchForts() {
      try {
        setFortsLoading(true);
        setFortsError(null);

        const { data, error } = await supabase
          .from('forts')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setForts(data || []);
      } catch (error) {
        console.error("Error fetching forts:", error);
        setFortsError(error.message);
      } finally {
        setFortsLoading(false);
      }
    }

    fetchForts();
  }, [supabase]);

  // Fetch media from Supabase
  useEffect(() => {
    async function fetchMedia() {
      try {
        setMediaLoading(true);
        setMediaError(null);

        const { data, error } = await supabase
          .from('media')
          .select('*')
          .order('upload_date', { ascending: false });

        if (error) {
          throw error;
        }

        setMediaLibrary(data || []);
      } catch (error) {
        console.error("Error fetching media:", error);
        setMediaError(error.message);
      } finally {
        setMediaLoading(false);
      }
    }

    fetchMedia();
  }, [supabase]);

  // Fetch inspections from Supabase
  useEffect(() => {
    async function fetchInspections() {
      try {
        setInspectionsLoading(true);
        setInspectionsError(null);

        const { data, error } = await supabase
          .from('inspections')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setScheduledInspections(data || []);
      } catch (error) {
        console.error("Error fetching inspections:", error);
        setInspectionsError(error.message);
      } finally {
        setInspectionsLoading(false);
      }
    }

    fetchInspections();
  }, [supabase]);

  // Mock data
  const stats = {
    totalForts: 350,
    activeReports: 47,
    resolvedThisMonth: 156,
    activeUsers: 2847,
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status] || variants.pending
  }

  const getUrgencyBadge = (urgency) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-orange-100 text-orange-800 border-orange-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return variants[urgency] || variants.medium
  }

  const getConditionBadge = (condition) => {
    const variants = {
      excellent: "bg-green-100 text-green-800 border-green-200",
      good: "bg-blue-100 text-blue-800 border-blue-200",
      fair: "bg-yellow-100 text-yellow-800 border-yellow-200",
      poor: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[condition] || variants.good
  }

  const getPriorityBadge = (priority) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-orange-100 text-orange-800 border-orange-200",
      low: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return variants[priority] || variants.medium
  }

  const getMediaTypeIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "document":
        return <File className="w-4 h-4" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  const getMediaTypeBadge = (type) => {
    const variants = {
      image: "bg-green-100 text-green-800 border-green-200",
      video: "bg-blue-100 text-blue-800 border-blue-200",
      document: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return variants[type] || variants.document
  }

  const handleScheduleInspection = () => {
    setShowScheduleInspectionDialog(true)
  }

  const handleSubmitInspection = async (e) => {
    e.preventDefault()
    console.log("[fortsaga] Inspection scheduled:", inspectionForm)

    try {
      const inspectionData = {
        fort: inspectionForm.fort,
        inspection_type: inspectionForm.inspectionType,
        inspector: inspectionForm.inspector.split(" - ")[0],
        date: inspectionForm.date,
        time: inspectionForm.time,
        duration: `${inspectionForm.duration} hours`,
        status: "scheduled",
        priority: inspectionForm.priority,
        description: inspectionForm.description,
        equipment: inspectionForm.equipment,
        notes: inspectionForm.notes,
        created_by: "Admin", // In real app, get from auth
      }

      const { data, error } = await supabase
        .from('inspections')
        .insert([inspectionData])
        .select()

      if (error) {
        throw error
      }

      // Update local state
      setScheduledInspections((prev) => [data[0], ...prev])
      alert(`Inspection scheduled successfully for ${inspectionForm.fort} on ${inspectionForm.date}!`)
      setShowScheduleInspectionDialog(false)

      // Reset form
      setInspectionForm({
        fort: "",
        inspectionType: "",
        inspector: "",
        date: "",
        time: "",
        duration: "2",
        priority: "medium",
        description: "",
        checklist: [],
        equipment: "",
        notes: "",
      })
    } catch (error) {
      console.error("Error scheduling inspection:", error)
      alert(`Error scheduling inspection: ${error.message}`)
    }
  }

  const handleCancelInspection = async (inspectionId) => {
    if (!confirm("Are you sure you want to cancel this inspection?")) {
      return
    }

    try {
      const { error } = await supabase
        .from('inspections')
        .update({
          status: "cancelled",
          updated_by: "Admin", // In real app, get from auth
        })
        .eq('id', inspectionId)

      if (error) {
        throw error
      }

      // Update local state
      setScheduledInspections((prev) =>
        prev.map((inspection) =>
          inspection.id === inspectionId ? { ...inspection, status: "cancelled" } : inspection,
        ),
      )
      alert("Inspection cancelled successfully!")
    } catch (error) {
      console.error("Error cancelling inspection:", error)
      alert(`Error cancelling inspection: ${error.message}`)
    }
  }

  const handleCompleteInspection = async (inspectionId) => {
    if (!confirm("Mark this inspection as completed?")) {
      return
    }

    try {
      const { error } = await supabase
        .from('inspections')
        .update({
          status: "completed",
          updated_by: "Admin", // In real app, get from auth
        })
        .eq('id', inspectionId)

      if (error) {
        throw error
      }

      // Update local state
      setScheduledInspections((prev) =>
        prev.map((inspection) =>
          inspection.id === inspectionId ? { ...inspection, status: "completed" } : inspection,
        ),
      )
      alert("Inspection marked as completed!")
    } catch (error) {
      console.error("Error completing inspection:", error)
      alert(`Error completing inspection: ${error.message}`)
    }
  }

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
    }))
    setUploadForm((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }))
  }

  const removeUploadFile = (index) => {
    setUploadForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSubmitMediaUpload = async (e) => {
    e.preventDefault()
    console.log("[fortsaga] Media upload submitted:", uploadForm)

    try {
      // Upload files to Supabase storage and database
      const uploadedFiles = []

      for (const file of uploadForm.files) {
        // Upload file to storage
        const fileExt = file.file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `media/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file.file)

        if (uploadError) {
          throw uploadError
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        // Create database record
        const { data: mediaData, error: dbError } = await supabase
          .from('media')
          .insert([{
            name: file.file.name,
            type: file.type,
            size: file.size,
            fort: uploadForm.fort,
            category: uploadForm.category,
            upload_date: new Date().toISOString(),
            uploaded_by: "Admin", // In real app, get from auth
            description: uploadForm.description,
            tags: uploadForm.tags.split(",").map((tag) => tag.trim()),
            url: publicUrl,
            thumbnail: file.type === 'image' ? publicUrl : null,
          }])
          .select()

        if (dbError) {
          throw dbError
        }

        uploadedFiles.push(mediaData[0])
      }

      // Update local state
      setMediaLibrary((prev) => [...uploadedFiles, ...prev])
      alert(`${uploadForm.files.length} file(s) uploaded successfully!`)
      setShowUploadMediaDialog(false)

      // Reset form
      setUploadForm({
        files: [],
        fort: "",
        category: "",
        description: "",
        tags: "",
      })
    } catch (error) {
      console.error("Error uploading media:", error)
      alert(`Error uploading files: ${error.message}`)
    }
  }

  const handleDeleteMedia = async (mediaId) => {
    if (!confirm("Are you sure you want to delete this media file?")) {
      return
    }

    try {
      // Find the media item to get file path
      const mediaItem = mediaLibrary.find(item => item.id === mediaId)

      if (mediaItem && mediaItem.url) {
        // Extract file path from URL
        const urlParts = mediaItem.url.split('/')
        const fileName = urlParts[urlParts.length - 1]
        const filePath = `media/${fileName}`

        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('media')
          .remove([filePath])

        if (storageError) {
          console.error("Error deleting from storage:", storageError)
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId)

      if (dbError) {
        throw dbError
      }

      // Update local state
      setMediaLibrary((prev) => prev.filter((item) => item.id !== mediaId))
      alert("Media file deleted successfully!")
    } catch (error) {
      console.error("Error deleting media:", error)
      alert(`Error deleting file: ${error.message}`)
    }
  }

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to delete")
      return
    }
    if (confirm(`Are you sure you want to delete ${selectedFiles.length} selected file(s)?`)) {
      setMediaLibrary((prev) => prev.filter((item) => !selectedFiles.includes(item.id)))
      setSelectedFiles([])
      alert(`${selectedFiles.length} file(s) deleted successfully!`)
    }
  }

  const toggleFileSelection = (fileId) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const filteredMedia = mediaLibrary.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(mediaSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(mediaSearchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(mediaSearchTerm.toLowerCase()))
    const matchesType = mediaTypeFilter === "all" || item.type === mediaTypeFilter
    const matchesFort = mediaFortFilter === "all" || item.fort === mediaFortFilter
    return matchesSearch && matchesType && matchesFort
  })

  const handleAddFort = () => {
    setShowAddFortDialog(true)
  }

  const handleSubmitFort = (e) => {
    e.preventDefault()
    console.log("[fortsaga] Fort form submitted:", fortForm)
    // Here you would typically send the data to your backend
    alert(`Fort "${fortForm.name}" has been added successfully!`)
    setShowAddFortDialog(false)
    // Reset form
    setFortForm({
      name: "",
      location: "",
      district: "",
      state: "Maharashtra",
      coordinates: "",
      builtBy: "",
      builtYear: "",
      historicalPeriod: "",
      fortType: "",
      elevation: "",
      area: "",
      description: "",
      historicalSignificance: "",
      architecture: "",
      keyFeatures: "",
      visitingHours: "",
      entryFee: "",
      accessibility: "",
      nearestRailway: "",
      nearestAirport: "",
      accommodation: "",
      bestTimeToVisit: "",
      trekDifficulty: "",
      images: [],
    })
  }

  const handleSubmitEditFort = async (e) => {
    e.preventDefault()
    console.log("[fortsaga] Edit fort form submitted:", editFortForm)

    try {
      const { error } = await supabase
        .from('forts')
        .update({
          name: editFortForm.name,
          location: editFortForm.location,
          district: editFortForm.district,
          state: editFortForm.state,
          coordinates: editFortForm.coordinates,
          built_by: editFortForm.builtBy,
          built_year: editFortForm.builtYear,
          historical_period: editFortForm.historicalPeriod,
          fort_type: editFortForm.fortType,
          elevation: editFortForm.elevation,
          area: editFortForm.area,
          description: editFortForm.description,
          historical_significance: editFortForm.historicalSignificance,
          architecture: editFortForm.architecture,
          key_features: editFortForm.keyFeatures,
          visiting_hours: editFortForm.visitingHours,
          entry_fee: editFortForm.entryFee,
          accessibility: editFortForm.accessibility,
          nearest_railway: editFortForm.nearestRailway,
          nearest_airport: editFortForm.nearestAirport,
          accommodation: editFortForm.accommodation,
          best_time_to_visit: editFortForm.bestTimeToVisit,
          trek_difficulty: editFortForm.trekDifficulty,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedFort.id)

      if (error) {
        throw error
      }

      // Update local state
      setForts((prev) =>
        prev.map((fort) =>
          fort.id === selectedFort.id ? { ...fort, ...editFortForm } : fort,
        ),
      )
      alert(`Fort "${editFortForm.name}" has been updated successfully!`)
      setShowEditFortDialog(false)
      setSelectedFort(null)
    } catch (error) {
      console.error("Error updating fort:", error)
      alert(`Error updating fort: ${error.message}`)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
    setFortForm((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))
  }

  const removeImage = (index) => {
    setFortForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleGenerateReport = () => {
    router.push('/reports')
  }

  const handleUploadMedia = () => {
    setShowUploadMediaDialog(true)
  }

  const handleViewReport = (reportId) => {
    const report = recentReports.find((r) => r.id === reportId)
    setSelectedReport(report)
    setReportViewOpen(true)
  }

  const handleEditReport = (reportId) => {
    const report = recentReports.find((r) => r.id === reportId)
    setSelectedReport(report)
    setReportStatus(report.status)
    setAssignedTo(report.assignedTo || "")
    setReportNotes(report.notes || "")
    setReportEditOpen(true)
  }

  const handleUpdateReport = () => {
    const updatedReports = recentReports.map((report) => {
      if (report.id === selectedReport.id) {
        const updatedReport = {
          ...report,
          status: reportStatus,
          assignedTo: assignedTo,
          notes: reportNotes,
          lastUpdated: new Date().toLocaleDateString(),
          updatedBy: "Admin",
        }

        // Add to history
        const historyEntry = {
          date: new Date().toLocaleDateString(),
          action: `Status changed to ${reportStatus}`,
          user: "Admin",
          notes: reportNotes,
        }

        setReportHistory((prev) => ({
          ...prev,
          [selectedReport.id]: [...(prev[selectedReport.id] || []), historyEntry],
        }))

        return updatedReport
      }
      return report
    })

    // Update the reports data (in real app, this would be an API call)
    setRecentReports(updatedReports)
    alert(`Report ${selectedReport.id} updated successfully!`)
    setReportEditOpen(false)
    setSelectedReport(null)
  }

  const handleBulkAction = (action) => {
    if (selectedReports.length === 0) {
      alert("Please select reports to perform bulk action")
      return
    }

    let updatedReports = [...recentReports]

    switch (action) {
      case "approve":
        updatedReports = updatedReports.map((report) =>
          selectedReports.includes(report.id)
            ? { ...report, status: "resolved", lastUpdated: new Date().toLocaleDateString() }
            : report,
        )
        alert(`${selectedReports.length} reports approved successfully!`)
        break
      case "assign":
        const inspector = prompt("Enter inspector name:")
        if (inspector) {
          updatedReports = updatedReports.map((report) =>
            selectedReports.includes(report.id)
              ? { ...report, assignedTo: inspector, lastUpdated: new Date().toLocaleDateString() }
              : report,
          )
          alert(`${selectedReports.length} reports assigned to ${inspector}!`)
        }
        break
      case "priority":
        const priority = prompt("Enter priority (low/medium/high):")
        if (priority && ["low", "medium", "high"].includes(priority.toLowerCase())) {
          updatedReports = updatedReports.map((report) =>
            selectedReports.includes(report.id)
              ? { ...report, urgency: priority.toLowerCase(), lastUpdated: new Date().toLocaleDateString() }
              : report,
          )
          alert(`${selectedReports.length} reports priority updated to ${priority}!`)
        }
        break
      case "delete":
        if (confirm(`Are you sure you want to delete ${selectedReports.length} reports?`)) {
          updatedReports = updatedReports.filter((report) => !selectedReports.includes(report.id))
          alert(`${selectedReports.length} reports deleted successfully!`)
        }
        break
    }

    setRecentReports(updatedReports)
    setSelectedReports([])
  }

  const filteredReports = recentReports.filter((report) => {
    const matchesFilter = reportFilter === "all" || report.status === reportFilter
    const matchesSearch =
      reportSearch === "" ||
      report.fort.toLowerCase().includes(reportSearch.toLowerCase()) ||
      report.issue.toLowerCase().includes(reportSearch.toLowerCase()) ||
      report.reporter.toLowerCase().includes(reportSearch.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const handleReportSelection = (reportId) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const handleViewFort = (fortId) => {
    const fort = forts.find((f) => f.id === fortId)
    if (fort) {
      setSelectedFort(fort)
      setShowViewFortDialog(true)
    }
  }

  const handleEditFort = (fortId) => {
    const fort = forts.find((f) => f.id === fortId)
    if (fort) {
      setSelectedFort(fort)
      setEditFortForm({
        name: fort.name || "",
        location: fort.location || "",
        district: fort.district || "",
        state: fort.state || "Maharashtra",
        coordinates: fort.coordinates || "",
        builtBy: fort.built_by || "",
        builtYear: fort.built_year || "",
        historicalPeriod: fort.historical_period || "",
        fortType: fort.fort_type || "",
        elevation: fort.elevation || "",
        area: fort.area || "",
        description: fort.description || "",
        historicalSignificance: fort.historical_significance || "",
        architecture: fort.architecture || "",
        keyFeatures: fort.key_features || "",
        visitingHours: fort.visiting_hours || "",
        entryFee: fort.entry_fee || "",
        accessibility: fort.accessibility || "",
        nearestRailway: fort.nearest_railway || "",
        nearestAirport: fort.nearest_airport || "",
        accommodation: fort.accommodation || "",
        bestTimeToVisit: fort.best_time_to_visit || "",
        trekDifficulty: fort.trek_difficulty || "",
        images: fort.images || [],
      })
      setShowEditFortDialog(true)
    }
  }

  const handleViewInspection = (inspectionId) => {
    const inspection = scheduledInspections.find((i) => i.id === inspectionId)
    setSelectedInspection(inspection)
    setInspectionViewOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Admin Dashboard" description="Manage forts, reports, and heritage conservation efforts" />

        <Dialog open={showScheduleInspectionDialog} onOpenChange={setShowScheduleInspectionDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Schedule Fort Inspection</DialogTitle>
              <DialogDescription>
                Schedule a comprehensive inspection for heritage conservation and maintenance planning.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitInspection} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Inspection Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fort">Fort *</Label>
                    <Select
                      value={inspectionForm.fort}
                      onValueChange={(value) => setInspectionForm((prev) => ({ ...prev, fort: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Raigad Fort">Raigad Fort</SelectItem>
                        <SelectItem value="Shivneri Fort">Shivneri Fort</SelectItem>
                        <SelectItem value="Pratapgad Fort">Pratapgad Fort</SelectItem>
                        <SelectItem value="Sinhagad Fort">Sinhagad Fort</SelectItem>
                        <SelectItem value="Lohagad Fort">Lohagad Fort</SelectItem>
                        <SelectItem value="Rajgad Fort">Rajgad Fort</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspectionType">Inspection Type *</Label>
                    <Select
                      value={inspectionForm.inspectionType}
                      onValueChange={(value) => setInspectionForm((prev) => ({ ...prev, inspectionType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inspection type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inspectionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspector">Inspector *</Label>
                    <Select
                      value={inspectionForm.inspector}
                      onValueChange={(value) => setInspectionForm((prev) => ({ ...prev, inspector: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inspector" />
                      </SelectTrigger>
                      <SelectContent>
                        {inspectors.map((inspector) => (
                          <SelectItem key={inspector} value={inspector}>
                            {inspector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={inspectionForm.priority}
                      onValueChange={(value) => setInspectionForm((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Inspection Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={inspectionForm.date}
                      onChange={(e) => setInspectionForm((prev) => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Start Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={inspectionForm.time}
                      onChange={(e) => setInspectionForm((prev) => ({ ...prev, time: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Select
                      value={inspectionForm.duration}
                      onValueChange={(value) => setInspectionForm((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="8">Full day (8 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Additional Information
                </h3>
                <div>
                  <Label htmlFor="description">Inspection Description *</Label>
                  <Textarea
                    id="description"
                    value={inspectionForm.description}
                    onChange={(e) => setInspectionForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the scope and objectives of this inspection..."
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="equipment">Required Equipment</Label>
                  <Textarea
                    id="equipment"
                    value={inspectionForm.equipment}
                    onChange={(e) => setInspectionForm((prev) => ({ ...prev, equipment: e.target.value }))}
                    placeholder="List any special equipment or tools needed for this inspection..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={inspectionForm.notes}
                    onChange={(e) => setInspectionForm((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional notes or special instructions..."
                    rows={2}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setShowScheduleInspectionDialog(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={
                    !inspectionForm.fort ||
                    !inspectionForm.inspectionType ||
                    !inspectionForm.inspector ||
                    !inspectionForm.date ||
                    !inspectionForm.time ||
                    !inspectionForm.description
                  }
                >
                  Schedule Inspection
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={showUploadMediaDialog} onOpenChange={setShowUploadMediaDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Upload Media Files</DialogTitle>
              <DialogDescription>
                Upload images, videos, and documents for fort documentation and heritage preservation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitMediaUpload} className="space-y-6">
              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Select Files</h3>
                <div>
                  <input
                    type="file"
                    id="mediaFiles"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("mediaFiles").click()}
                    className="w-full h-24 border-2 border-dashed border-border hover:border-primary"
                  >
                    <Upload className="w-8 h-8 mr-3" />
                    <div className="text-center">
                      <div className="font-medium">Click to upload files</div>
                      <div className="text-sm text-muted-foreground">Images, Videos, Documents</div>
                    </div>
                  </Button>
                </div>

                {uploadForm.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Files ({uploadForm.files.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                      {uploadForm.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border"
                        >
                          {file.type === "image" && (
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          {file.type !== "image" && (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              {getMediaTypeIcon(file.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{file.size}</div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUploadFile(index)}
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

              {/* Metadata */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">File Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fort">Associated Fort *</Label>
                    <Select
                      value={uploadForm.fort}
                      onValueChange={(value) => setUploadForm((prev) => ({ ...prev, fort: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Raigad Fort">Raigad Fort</SelectItem>
                        <SelectItem value="Shivneri Fort">Shivneri Fort</SelectItem>
                        <SelectItem value="Pratapgad Fort">Pratapgad Fort</SelectItem>
                        <SelectItem value="Sinhagad Fort">Sinhagad Fort</SelectItem>
                        <SelectItem value="Lohagad Fort">Lohagad Fort</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={uploadForm.category}
                      onValueChange={(value) => setUploadForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Architecture">Architecture</SelectItem>
                        <SelectItem value="Aerial Views">Aerial Views</SelectItem>
                        <SelectItem value="Historical Documents">Historical Documents</SelectItem>
                        <SelectItem value="Restoration">Restoration</SelectItem>
                        <SelectItem value="Events">Events</SelectItem>
                        <SelectItem value="Artifacts">Artifacts</SelectItem>
                        <SelectItem value="Landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the content and significance of these files..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="Enter tags separated by commas (e.g., gate, entrance, architecture)"
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setShowUploadMediaDialog(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={uploadForm.files.length === 0 || !uploadForm.fort || !uploadForm.category}
                >
                  Upload Files
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forts">Forts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Forts</CardTitle>
                  <MapPin className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.totalForts}</div>
                  <p className="text-xs text-muted-foreground">Across Maharashtra</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Reports</CardTitle>
                  <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.activeReports}</div>
                  <p className="text-xs text-muted-foreground">Pending resolution</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resolved This Month</CardTitle>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.resolvedThisMonth}</div>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                  <Users className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">Community members</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Reports</CardTitle>
                  <CardDescription>Latest issues reported by the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{report.fort}</span>
                            <Badge className={getStatusBadge(report.status)}>{report.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{report.issue}</p>
                          <p className="text-xs text-muted-foreground mt-1">by {report.reporter}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleViewReport(report.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/admin/add-fort" passHref>
                      <Button className="h-20 flex-col bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Plus className="w-6 h-6 mb-2" />
                        Add Fort
                      </Button>
                    </Link>
                    <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={handleGenerateReport}>
                      <FileText className="w-6 h-6 mb-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent" onClick={handleUploadMedia}>
                      <Camera className="w-6 h-6 mb-2" />
                      Upload Media
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col bg-transparent"
                      onClick={handleScheduleInspection}
                    >
                      <Calendar className="w-6 h-6 mb-2" />
                      Schedule Inspection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forts Management Tab */}
          <TabsContent value="forts" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Fort Management</h2>
                <p className="text-muted-foreground">Manage fort profiles and information</p>
              </div>
              <div>
                <Link href="/admin/add-fort" passHref>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleAddFort}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Fort
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search forts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border-border">
              {fortsLoading ? (
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">Loading forts...</div>
                </CardContent>
              ) : fortsError ? (
                <CardContent className="p-8 text-center">
                  <div className="text-destructive">Error loading forts: {fortsError}</div>
                </CardContent>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fort Name</TableHead>
                      <TableHead>Location</TableHead>
                      {/* <TableHead>Status</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Last Inspection</TableHead>
                      <TableHead>Reports</TableHead> */}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forts.map((fort) => (
                      <TableRow key={fort.id}>
                        <TableCell className="font-medium text-foreground">{fort.name}</TableCell>
                        <TableCell className="text-muted-foreground">{fort.location}</TableCell>
                        {/* <TableCell>
                          <Badge className={getStatusBadge(fort.status)}>{fort.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getConditionBadge(fort.condition)}>{fort.condition}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{fort.lastInspection}</TableCell>
                        <TableCell className="text-muted-foreground">{fort.reports}</TableCell> */}
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewFort(fort.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditFort(fort.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          {/* Reports Management Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Reports Management</h3>
                <p className="text-sm text-muted-foreground">Review and manage citizen reports</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={reportSearch}
                    onChange={(e) => setReportSearch(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm w-48"
                  />
                  <select
                    value={reportFilter}
                    onChange={(e) => setReportFilter(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                {selectedReports.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("approve")}>
                      Approve Selected
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("assign")}>
                      Assign Selected
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBulkAction("priority")}>
                      Set Priority
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                      Delete Selected
                    </Button>
                  </div>
                )}
                <Button onClick={handleGenerateReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>

            <Card className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedReports(filteredReports.map((r) => r.id))
                          } else {
                            setSelectedReports([])
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </TableHead>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Fort</TableHead>
                    <TableHead>Issue</TableHead>
                    {/* <TableHead>Reporter</TableHead> */}
                    <TableHead>Location</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => handleReportSelection(report.id)}
                          className="rounded border-gray-300"
                        />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{report.id}</TableCell>
                      <TableCell className="text-muted-foreground">{report.fort}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">{report.description}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">{report.location}
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyBadge(report.urgency)}>{report.urgency}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{report.created_at}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewReport(report.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditReport(report.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredReports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No reports found matching your criteria.</div>
              )}
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">User Management</h2>
              <p className="text-muted-foreground">Manage community members and their roles</p>
            </div>
            <Card className="border-border p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">User Management</h3>
              <p className="text-muted-foreground mb-4">View and manage registered users, their roles, and activity</p>
              <Button variant="outline">Coming Soon</Button>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Media Gallery</h2>
                <p className="text-muted-foreground">Manage fort images, videos, and documentation</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setMediaViewMode(mediaViewMode === "grid" ? "list" : "grid")}>
                  {mediaViewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleUploadMedia}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </div>
            </div>

            {/* Media Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search media files..."
                  value={mediaSearchTerm}
                  onChange={(e) => setMediaSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Select value={mediaTypeFilter} onValueChange={setMediaTypeFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
              <Select value={mediaFortFilter} onValueChange={setMediaFortFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Fort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Forts</SelectItem>
                  <SelectItem value="Raigad Fort">Raigad Fort</SelectItem>
                  <SelectItem value="Shivneri Fort">Shivneri Fort</SelectItem>
                  <SelectItem value="Pratapgad Fort">Pratapgad Fort</SelectItem>
                </SelectContent>
              </Select>
              {selectedFiles.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete ({selectedFiles.length})
                </Button>
              )}
            </div>

            {/* Media Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mediaLibrary.filter((item) => item.type === "image").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Images</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mediaLibrary.filter((item) => item.type === "video").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Videos</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <File className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {mediaLibrary.filter((item) => item.type === "document").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Documents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{mediaLibrary.length}</div>
                      <div className="text-sm text-muted-foreground">Total Files</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>



            {/* Media Gallery */}
            {mediaLoading ? (
              <Card className="border-border p-8 text-center">
                <div className="text-muted-foreground">Loading media files...</div>
              </Card>
            ) : mediaError ? (
              <Card className="border-border p-8 text-center">
                <div className="text-destructive">Error loading media: {mediaError}</div>
              </Card>
            ) : mediaViewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedia.map((item) => (
                  <Card key={item.id} className="border-border overflow-hidden">
                    <div className="relative">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        {item.type === "image" ? (
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : item.type === "video" ? (
                          <div className="relative w-full h-full">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        ) : (
                          <File className="w-16 h-16 text-muted-foreground" />
                        )}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={getMediaTypeBadge(item.type)}>
                          {getMediaTypeIcon(item.type)}
                          <span className="ml-1 capitalize">{item.type}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(item.id)}
                          onChange={() => toggleFileSelection(item.id)}
                          className="w-4 h-4 rounded border-border"
                        />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-foreground truncate" title={item.name}>
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.fort}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{item.size}</span>
                          <span>{item.upload_date ? new Date(item.upload_date).toLocaleDateString() : item.uploadDate}</span>
                        </div>
                        <div className="flex items-center gap-1 pt-2">
                          <Button variant="ghost" size="sm" onClick={() => window.open(item.url, "_blank")}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => window.open(item.url, "_blank")}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMedia(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedFiles.length === filteredMedia.length && filteredMedia.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFiles(filteredMedia.map((item) => item.id))
                            } else {
                              setSelectedFiles([])
                            }
                          }}
                          className="w-4 h-4 rounded border-border"
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Fort</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedia.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(item.id)}
                            onChange={() => toggleFileSelection(item.id)}
                            className="w-4 h-4 rounded border-border"
                          />
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                        <TableCell>
                          <Badge className={getMediaTypeBadge(item.type)}>
                            {getMediaTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.fort}</TableCell>
                        <TableCell className="text-muted-foreground">{item.category}</TableCell>
                        <TableCell className="text-muted-foreground">{item.size}</TableCell>
                        <TableCell className="text-muted-foreground">{item.upload_date ? new Date(item.upload_date).toLocaleDateString() : item.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => window.open(item.url, "_blank")}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => window.open(item.url, "_blank")}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMedia(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {filteredMedia.length === 0 && (
              <Card className="border-border p-8 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Media Files Found</h3>
                <p className="text-muted-foreground mb-4">
                  {mediaSearchTerm || mediaTypeFilter !== "all" || mediaFortFilter !== "all"
                    ? "Try adjusting your search filters"
                    : "Upload your first media files to get started"}
                </p>
                <Button onClick={handleUploadMedia} className="bg-primary hover:bg-primary/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Media
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Maintenance & Inspections</h2>
                <p className="text-muted-foreground">
                  Track repairs, updates, conservation activities, and scheduled inspections
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleScheduleInspection}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Inspection
              </Button>
            </div>

            {/* Inspection Stats */}
            {inspectionsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border-border">
                    <CardContent className="p-4">
                      <div className="animate-pulse">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-muted rounded"></div>
                          <div>
                            <div className="h-8 bg-muted rounded w-12 mb-2"></div>
                            <div className="h-4 bg-muted rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : inspectionsError ? (
              <Card className="border-border">
                <CardContent className="p-8 text-center">
                  <div className="text-destructive">Error loading inspection stats: {inspectionsError}</div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {scheduledInspections.filter((i) => i.status === "scheduled").length}
                        </div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {scheduledInspections.filter((i) => i.status === "completed").length}
                        </div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {scheduledInspections.filter((i) => i.priority === "high").length}
                        </div>
                        <div className="text-sm text-muted-foreground">High Priority</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold text-foreground">{scheduledInspections.length}</div>
                        <div className="text-sm text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Scheduled Inspections */}
            {inspectionsLoading ? (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Scheduled Inspections</CardTitle>
                  <CardDescription>Upcoming and completed fort inspections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start justify-between p-4 bg-card/50 rounded-lg border border-border">
                        <div className="flex-1 animate-pulse">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-6 bg-muted rounded w-32"></div>
                            <div className="h-6 bg-muted rounded w-20"></div>
                            <div className="h-6 bg-muted rounded w-16"></div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="h-4 bg-muted rounded w-24"></div>
                              <div className="h-4 bg-muted rounded w-28"></div>
                            </div>
                            <div className="space-y-1">
                              <div className="h-4 bg-muted rounded w-32"></div>
                              <div className="h-4 bg-muted rounded w-24"></div>
                            </div>
                          </div>
                          <div className="h-4 bg-muted rounded w-full mt-2"></div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="h-8 bg-muted rounded w-8"></div>
                          <div className="h-8 bg-muted rounded w-8"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : inspectionsError ? (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Scheduled Inspections</CardTitle>
                  <CardDescription>Upcoming and completed fort inspections</CardDescription>
                </CardHeader>
                <CardContent className="p-8 text-center">
                  <div className="text-destructive">Error loading inspections: {inspectionsError}</div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Scheduled Inspections</CardTitle>
                  <CardDescription>Upcoming and completed fort inspections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledInspections.map((inspection) => (
                      <div
                        key={inspection.id}
                        className="flex items-start justify-between p-4 bg-card/50 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{inspection.fort}</h3>
                            <Badge className={getStatusBadge(inspection.status)}>{inspection.status}</Badge>
                            <Badge className={getPriorityBadge(inspection.priority)}>{inspection.priority}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <ClipboardList className="w-4 h-4" />
                                <span>{inspection.inspection_type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{inspection.inspector}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {inspection.date} at {inspection.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Duration: {inspection.duration}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{inspection.description}</p>
                          {inspection.equipment && (
                            <p className="text-xs text-muted-foreground mt-1">
                              <strong>Equipment:</strong> {inspection.equipment}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {inspection.status === "scheduled" && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => handleCompleteInspection(inspection.id)}>
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancelInspection(inspection.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleViewInspection(inspection.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {scheduledInspections.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Inspections Scheduled</h3>
                      <p className="text-muted-foreground mb-4">Schedule your first fort inspection to get started</p>
                      <Button onClick={handleScheduleInspection} className="bg-primary hover:bg-primary/90">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Inspection
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={reportViewOpen} onOpenChange={setReportViewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Report Details - {selectedReport?.id}</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fort</label>
                    <p className="text-foreground">{selectedReport.fort}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Reporter</label>
                    <p className="text-foreground">{selectedReport.reporter}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge className={getStatusBadge(selectedReport.status)}>{selectedReport.status}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Urgency</label>
                    <Badge className={getUrgencyBadge(selectedReport.urgency)}>{selectedReport.urgency}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date Reported</label>
                    <p className="text-foreground">{selectedReport.date}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="text-foreground">{selectedReport.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Issue Description</label>
                  <p className="text-foreground mt-1">{selectedReport.issue}</p>
                </div>

                {reportHistory[selectedReport.id] && reportHistory[selectedReport.id].length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Report History</label>
                    <div className="mt-2 space-y-2">
                      {reportHistory[selectedReport.id].map((entry, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{entry.action}</p>
                            <p className="text-xs text-muted-foreground">
                              by {entry.user} on {entry.date}
                            </p>
                            {entry.notes && <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setReportViewOpen(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setReportViewOpen(false)
                      handleEditReport(selectedReport.id)
                    }}
                  >
                    Edit Report
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={reportEditOpen} onOpenChange={setReportEditOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Report - {selectedReport?.id}</DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <select
                      value={reportStatus}
                      onChange={(e) => setReportStatus(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Assign To</label>
                    <select
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="">Select Inspector</option>
                      <option value="inspector1">Rajesh Patil</option>
                      <option value="inspector2">Sunita Desai</option>
                      <option value="inspector3">Amit Kulkarni</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Admin Notes</label>
                  <textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Add notes about this report..."
                    className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground h-24 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setReportEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateReport}>Update Report</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={inspectionViewOpen} onOpenChange={setInspectionViewOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Inspection Details - {selectedInspection?.id}</DialogTitle>
            </DialogHeader>
            {selectedInspection && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fort</label>
                    <p className="text-foreground">{selectedInspection.fort}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Inspection Type</label>
                    <p className="text-foreground">{selectedInspection.inspection_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Inspector</label>
                    <p className="text-foreground">{selectedInspection.inspector}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge className={getStatusBadge(selectedInspection.status)}>{selectedInspection.status}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Priority</label>
                    <Badge className={getPriorityBadge(selectedInspection.priority)}>{selectedInspection.priority}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="text-foreground">{selectedInspection.date} at {selectedInspection.time}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Duration</label>
                    <p className="text-foreground">{selectedInspection.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="text-foreground">{selectedInspection.created_at ? new Date(selectedInspection.created_at).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-foreground mt-1">{selectedInspection.description}</p>
                </div>
                {selectedInspection.equipment && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Required Equipment</label>
                    <p className="text-foreground mt-1">{selectedInspection.equipment}</p>
                  </div>
                )}
                {selectedInspection.notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Additional Notes</label>
                    <p className="text-foreground mt-1">{selectedInspection.notes}</p>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setInspectionViewOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showViewFortDialog} onOpenChange={setShowViewFortDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">{selectedFort?.name}</DialogTitle>
              <DialogDescription>
                Detailed information about this fort
              </DialogDescription>
            </DialogHeader>
            {selectedFort && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                      <p className="text-foreground">{selectedFort.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">District</Label>
                      <p className="text-foreground">{selectedFort.district}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">State</Label>
                      <p className="text-foreground">{selectedFort.state}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Coordinates</Label>
                      <p className="text-foreground">{selectedFort.coordinates}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Built By</Label>
                      <p className="text-foreground">{selectedFort.built_by}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Built Year</Label>
                      <p className="text-foreground">{selectedFort.built_year}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Historical Period</Label>
                      <p className="text-foreground">{selectedFort.historical_period}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Fort Type</Label>
                      <p className="text-foreground">{selectedFort.fort_type}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Elevation</Label>
                      <p className="text-foreground">{selectedFort.elevation}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Area</Label>
                      <p className="text-foreground">{selectedFort.area}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Visiting Hours</Label>
                      <p className="text-foreground">{selectedFort.visiting_hours}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Entry Fee</Label>
                      <p className="text-foreground">{selectedFort.entry_fee}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Accessibility</Label>
                      <p className="text-foreground">{selectedFort.accessibility}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nearest Railway</Label>
                      <p className="text-foreground">{selectedFort.nearest_railway}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Nearest Airport</Label>
                      <p className="text-foreground">{selectedFort.nearest_airport}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Trek Difficulty</Label>
                      <p className="text-foreground">{selectedFort.trek_difficulty}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-foreground mt-1">{selectedFort.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Historical Significance</Label>
                  <p className="text-foreground mt-1">{selectedFort.historical_significance}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Architecture</Label>
                  <p className="text-foreground mt-1">{selectedFort.architecture}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Key Features</Label>
                  <p className="text-foreground mt-1">{selectedFort.key_features}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Accommodation</Label>
                  <p className="text-foreground mt-1">{selectedFort.accommodation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Best Time to Visit</Label>
                  <p className="text-foreground mt-1">{selectedFort.best_time_to_visit}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowViewFortDialog(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setShowViewFortDialog(false)
                    handleEditFort(selectedFort.id)
                  }}>
                    Edit Fort
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showEditFortDialog} onOpenChange={setShowEditFortDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">Edit Fort - {selectedFort?.name}</DialogTitle>
              <DialogDescription>
                Update fort information and details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEditFort} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editName">Name *</Label>
                  <Input
                    id="editName"
                    value={editFortForm.name}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editLocation">Location *</Label>
                  <Input
                    id="editLocation"
                    value={editFortForm.location}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editDistrict">District</Label>
                  <Input
                    id="editDistrict"
                    value={editFortForm.district}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, district: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editState">State</Label>
                  <Select
                    value={editFortForm.state}
                    onValueChange={(value) => setEditFortForm((prev) => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Goa">Goa</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editCoordinates">Coordinates</Label>
                  <Input
                    id="editCoordinates"
                    value={editFortForm.coordinates}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, coordinates: e.target.value }))}
                    placeholder="e.g., 18.9220° N, 72.8347° E"
                  />
                </div>
                <div>
                  <Label htmlFor="editBuiltBy">Built By</Label>
                  <Input
                    id="editBuiltBy"
                    value={editFortForm.builtBy}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, builtBy: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editBuiltYear">Built Year</Label>
                  <Input
                    id="editBuiltYear"
                    value={editFortForm.builtYear}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, builtYear: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editHistoricalPeriod">Historical Period</Label>
                  <Input
                    id="editHistoricalPeriod"
                    value={editFortForm.historicalPeriod}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, historicalPeriod: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editFortType">Fort Type</Label>
                  <Input
                    id="editFortType"
                    value={editFortForm.fortType}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, fortType: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editElevation">Elevation</Label>
                  <Input
                    id="editElevation"
                    value={editFortForm.elevation}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, elevation: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editArea">Area</Label>
                  <Input
                    id="editArea"
                    value={editFortForm.area}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, area: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editVisitingHours">Visiting Hours</Label>
                  <Input
                    id="editVisitingHours"
                    value={editFortForm.visitingHours}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, visitingHours: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editEntryFee">Entry Fee</Label>
                  <Input
                    id="editEntryFee"
                    value={editFortForm.entryFee}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, entryFee: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editAccessibility">Accessibility</Label>
                  <Input
                    id="editAccessibility"
                    value={editFortForm.accessibility}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, accessibility: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editNearestRailway">Nearest Railway</Label>
                  <Input
                    id="editNearestRailway"
                    value={editFortForm.nearestRailway}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, nearestRailway: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editNearestAirport">Nearest Airport</Label>
                  <Input
                    id="editNearestAirport"
                    value={editFortForm.nearestAirport}
                    onChange={(e) => setEditFortForm((prev) => ({ ...prev, nearestAirport: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="editTrekDifficulty">Trek Difficulty</Label>
                  <Select
                    value={editFortForm.trekDifficulty}
                    onValueChange={(value) => setEditFortForm((prev) => ({ ...prev, trekDifficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Difficult">Difficult</SelectItem>
                      <SelectItem value="Very Difficult">Very Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editFortForm.description}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="editHistoricalSignificance">Historical Significance</Label>
                <Textarea
                  id="editHistoricalSignificance"
                  value={editFortForm.historicalSignificance}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, historicalSignificance: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="editArchitecture">Architecture</Label>
                <Textarea
                  id="editArchitecture"
                  value={editFortForm.architecture}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, architecture: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="editKeyFeatures">Key Features</Label>
                <Textarea
                  id="editKeyFeatures"
                  value={editFortForm.keyFeatures}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, keyFeatures: e.target.value }))}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="editAccommodation">Accommodation</Label>
                <Textarea
                  id="editAccommodation"
                  value={editFortForm.accommodation}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, accommodation: e.target.value }))}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="editBestTimeToVisit">Best Time to Visit</Label>
                <Textarea
                  id="editBestTimeToVisit"
                  value={editFortForm.bestTimeToVisit}
                  onChange={(e) => setEditFortForm((prev) => ({ ...prev, bestTimeToVisit: e.target.value }))}
                  rows={2}
                />
              </div>
              <DialogFooter className="gap-2">
                <Button type="button" variant="outline" onClick={() => setShowEditFortDialog(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={!editFortForm.name || !editFortForm.location}
                >
                  Update Fort
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
