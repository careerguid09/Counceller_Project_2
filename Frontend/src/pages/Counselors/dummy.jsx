// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import {
//   Stethoscope,
//   Pill,
//   UserRound,
//   Microscope,
//   Settings,
//   Briefcase,
//   GraduationCap,
//   BookOpen,
//   Laptop,
//   Languages,
//   Leaf,
//   Presentation,
//   Clock,
//   LogOut,
//   ChevronRight,
//   MapPin,
//   CheckCircle,
//   ChevronLeft,
//   Mail,
//   Phone,
//   MessageSquare,
//   RefreshCcw,
//   Trash2,
//   Users,
//   ArrowRight,
//   Home,
//   TrendingUp,
//   FileSpreadsheet,
//   Database,
//   Sparkles,
// } from "lucide-react";
// import ScrollToTop from "../../components/ScrollToTop";

// const CounselorDashboard = () => {
//   // ========== STATES ==========
//   const [counselorProfile, setCounselorProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentView, setCurrentView] = useState("dashboard");
//   const [selectedDomain, setSelectedDomain] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [domainCourses, setDomainCourses] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [clientsLoading, setClientsLoading] = useState(false);
//   const [domainStats, setDomainStats] = useState([]);
//   const [overallStats, setOverallStats] = useState({
//     total: 0,
//     new: 0,
//     inProgress: 0,
//     completed: 0,
//   });
//   const [courseStats, setCourseStats] = useState([]);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [exporting, setExporting] = useState(false);

//   // ========== DOMAIN DATA ==========
//   const counselorDomains = [
//     {
//       id: 1,
//       name: "MEDICAL",
//       icon: Stethoscope,
//       description: "Healthcare and surgical medical programs",
//       color: "text-red-600",
//       bgColor: "bg-red-50",
//     },
//     {
//       id: 2,
//       name: "PHARMACY",
//       icon: Pill,
//       description: "Pharmaceutical sciences and drug research",
//       color: "text-emerald-600",
//       bgColor: "bg-emerald-50",
//     },
//     {
//       id: 3,
//       name: "NURSING",
//       icon: UserRound,
//       description: "Clinical nursing and healthcare assistance",
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       id: 4,
//       name: "PARAMEDICAL",
//       icon: Microscope,
//       description: "Paramedical and allied health services",
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//     {
//       id: 5,
//       name: "ENGINEERING",
//       icon: Settings,
//       description: "Technical and technological innovations",
//       color: "text-orange-600",
//       bgColor: "bg-orange-50",
//     },
//     {
//       id: 6,
//       name: "MANAGEMENT",
//       icon: Briefcase,
//       description: "Business leadership and administration",
//       color: "text-indigo-600",
//       bgColor: "bg-indigo-50",
//     },
//     {
//       id: 7,
//       name: "GRADUATION",
//       icon: BookOpen,
//       description: "Undergraduate arts and science degrees",
//       color: "text-teal-600",
//       bgColor: "bg-teal-50",
//     },
//     {
//       id: 8,
//       name: "POST GRADUATION",
//       icon: GraduationCap,
//       description: "Advanced master and research programs",
//       color: "text-cyan-600",
//       bgColor: "bg-cyan-50",
//     },
//     {
//       id: 9,
//       name: "VOCATIONAL",
//       icon: Laptop,
//       description: "Skill-based technical training",
//       color: "text-pink-600",
//       bgColor: "bg-pink-50",
//     },
//     {
//       id: 10,
//       name: "LANGUAGES",
//       icon: Languages,
//       description: "Global communication and linguistics",
//       color: "text-yellow-600",
//       bgColor: "bg-yellow-50",
//     },
//     {
//       id: 11,
//       name: "AGRICULTURE",
//       icon: Leaf,
//       description: "Farm science and agricultural technology",
//       color: "text-lime-600",
//       bgColor: "bg-lime-50",
//     },
//     {
//       id: 12,
//       name: "EDUCATION",
//       icon: Presentation,
//       description: "Teacher training and pedagogical studies",
//       color: "text-amber-600",
//       bgColor: "bg-amber-50",
//     },
//   ];

//   const DOMAIN_COURSES_MAP = {
//     MEDICAL: ["MBBS", "BAMS", "BHMS", "BNYS", "BDS", "BPT", "B.Sc Nursing"],
//     PHARMACY: ["B.Pharma", "D.Pharma", "M.Pharma", "Pharm D", "PhD Pharmacy"],
//     NURSING: ["ANM", "GNM", "BSc Nursing", "MSc Nursing", "Post Basic Nursing"],
//     PARAMEDICAL: [
//       "X-Ray Technician",
//       "BMLT / DMLT",
//       "BPT / MPT",
//       "Bachelor of Human Nutrition",
//     ],
//     ENGINEERING: [
//       "Diploma Engineering",
//       "B.Tech / BE",
//       "M.Tech / ME",
//       "PhD Engineering",
//     ],
//     MANAGEMENT: ["BBA", "MBA", "PGDM", "Executive MBA"],
//     GRADUATION: ["BA", "BSc", "BCom", "BCA"],
//     "POST GRADUATION": ["MA", "MSc", "MCom", "MCA"],
//     VOCATIONAL: ["ITI", "BCA", "MCA", "PGDCA", "B.Lib / M.Lib"],
//     LANGUAGES: ["German", "French", "Italian", "Chinese", "Japanese"],
//     AGRICULTURE: ["BSc Agriculture", "MSc Agriculture", "B.Tech Agriculture"],
//     EDUCATION: ["B.Ed", "D.El.Ed", "M.Ed", "CTET / STET Guidance"],
//   };

//   // ========== INITIALIZE ==========
//   useEffect(() => {
//     const savedProfile = localStorage.getItem("counselorProfile");
//     const profileData = savedProfile
//       ? JSON.parse(savedProfile)
//       : {
//           name: "Dr. Sandeep",
//           email: "sandeep@careerguide.com",
//         };
//     setCounselorProfile(profileData);
//     fetchDomainStats();
//   }, []);

//   const fetchDomainStats = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/stats/domain`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         setDomainStats(data.domainStats || []);
//         setOverallStats(
//           data.overallStats || {
//             total: 0,
//             new: 0,
//             inProgress: 0,
//             completed: 0,
//           },
//         );
//       }
//     } catch (err) {
//       console.error("Failed to fetch domain stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCourseStats = async (domain) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/stats/course/${domain}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );
//       const data = await res.json();
//       if (data.success) {
//         setCourseStats(data.courseStats || []);
//       }
//     } catch (err) {
//       console.error("Failed to fetch course stats:", err);
//     }
//   };

//   const markDomainAsViewed = async (domainName) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/domain/viewed/${domainName}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );

//       if (res.ok) {
//         fetchDomainStats();
//       }
//     } catch (err) {
//       console.error("Failed to mark domain as viewed:", err);
//     }
//   };

//   const markCourseAsViewed = async (courseName) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/course/viewed/${encodeURIComponent(courseName)}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );

//       if (res.ok) {
//         if (selectedDomain) {
//           fetchCourseStats(selectedDomain.name);
//         }
//       }
//     } catch (err) {
//       console.error("Failed to mark course as viewed:", err);
//     }
//   };

//   const markStudentAsViewed = async (clientId) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/student/viewed/${clientId}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );
//       if (res.ok) {
//         setClients((prev) =>
//           prev.map((c) =>
//             c._id === clientId
//               ? { ...c, studentViewed: true, isNew: false }
//               : c,
//           ),
//         );

//         if (selectedClient && selectedClient._id === clientId) {
//           setSelectedClient((prev) => ({
//             ...prev,
//             studentViewed: true,
//             isNew: false,
//           }));
//         }
//       }
//     } catch (err) {
//       console.error("Failed to mark student as viewed:", err);
//     }
//   };

//   const handleDomainClick = async (domain) => {
//     if (domain.hasNew) {
//       await markDomainAsViewed(domain.domain);
//     }

//     const domainInfo =
//       counselorDomains.find((d) => d.name === domain.domain) ||
//       counselorDomains[0];
//     setSelectedDomain({ ...domainInfo, stats: domain });

//     const courses = DOMAIN_COURSES_MAP[domainInfo.name] || [];
//     setDomainCourses(courses);

//     await fetchCourseStats(domainInfo.name);
//     setCurrentView("domainCourses");
//   };

//   const handleCourseClick = async (course) => {
//     if (course.hasNew) {
//       await markCourseAsViewed(course.course);
//     }

//     setSelectedCourse(course);
//     setClientsLoading(true);
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/course/${encodeURIComponent(course.course)}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//         },
//       );

//       if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//       const data = await res.json();

//       const sortedClients = (data.data || []).sort((a, b) => {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       });

//       setClients(sortedClients);
//       setCurrentView("clients");
//     } catch (err) {
//       console.error("Failed to fetch clients:", err);
//       alert("Failed to load clients data");
//     } finally {
//       setClientsLoading(false);
//     }
//   };

//   const handleClientClick = async (client) => {
//     if (client.isNew && !client.studentViewed) {
//       await markStudentAsViewed(client._id);
//     }

//     setSelectedClient({ ...client, studentViewed: true, isNew: false });
//     setCurrentView("clientDetail");
//   };

//   const deleteClient = async (clientId) => {
//     try {
//       setIsDeleting(true);
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clients/${clientId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//         },
//       });

//       if (res.ok) {
//         setClients((prev) => prev.filter((c) => c._id !== clientId));
//         setDeleteModal(null);

//         fetchDomainStats();
//         if (selectedDomain) {
//           fetchCourseStats(selectedDomain.name);
//         }

//         if (clients.length === 1) {
//           handleBackToCourses();
//         }

//         toast.success("Client deleted successfully ✅");
//       } else {
//         toast.error("Failed to delete client ❌");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete client");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const updateClientStatus = async (clientId, newStatus) => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/clients/${clientId}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//           },
//           body: JSON.stringify({ status: newStatus }),
//         },
//       );

//       if (res.ok) {
//         setClients((prev) =>
//           prev.map((c) =>
//             c._id === clientId ? { ...c, status: newStatus } : c,
//           ),
//         );
//         if (selectedClient && selectedClient._id === clientId) {
//           setSelectedClient((prev) => ({ ...prev, status: newStatus }));
//         }

//         fetchDomainStats();
//         if (selectedDomain) {
//           fetchCourseStats(selectedDomain.name);
//         }
//         toast.success("Client status updated 🔄");
//       } else {
//         toast.error("Failed to update status ❌");
//       }
//     } catch (err) {
//       console.error("Failed to update status:", err);
//     }
//   };

//   const exportToExcel = async () => {
//     try {
//       setExporting(true);
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clients/export`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//         },
//       });

//       if (!res.ok) throw new Error("Export failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `students_export_${new Date().toISOString().split("T")[0]}.xlsx`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//     } catch (err) {
//       console.error("Export error:", err);
//       alert("Failed to export data");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const handleBackToDashboard = () => {
//     setCurrentView("dashboard");
//     setSelectedDomain(null);
//     setSelectedCourse(null);
//     setClients([]);
//     fetchDomainStats();
//   };

//   const handleBackToDomains = () => {
//     setCurrentView("domainCourses");
//     setSelectedCourse(null);
//     setClients([]);
//   };

//   const handleBackToCourses = () => {
//     setCurrentView("domainCourses");
//     setSelectedClient(null);
//   };

//   const handleBackToClients = () => {
//     setCurrentView("clients");
//     setSelectedClient(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not available";
//     return new Date(dateString).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return "Not available";
//     const date = new Date(dateString);
//     return (
//       date.toLocaleDateString("en-IN") +
//       " " +
//       date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
//     );
//   };

//   // Check if student is new (within last 7 days and not viewed)
//   const isStudentNew = (student) => {
//     if (!student.newAt) return false;
//     if (student.studentViewed) return false;

//     const newAt = new Date(student.newAt);
//     const now = new Date();
//     const daysDiff = (now - newAt) / (1000 * 60 * 60 * 24);

//     return daysDiff <= 7 && student.isNew;
//   };

//   const renderDashboard = () => (
//     <div>
//       <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 mb-10 text-white shadow-2xl relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 rounded-full -translate-y-32 translate-x-32"></div>
//         <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-800/20 rounded-full translate-y-24 -translate-x-24"></div>

//         <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
//           <div className="max-w-2xl">
//             <h1 className="text-4xl font-black mb-4">
//               Welcome back, {counselorProfile?.name}!
//             </h1>
//             <p className="text-blue-200 text-lg">
//               Manage {overallStats.total} students across {domainStats.length}{" "}
//               domains.
//               {overallStats.new > 0 && (
//                 <span className="ml-2 bg-gradient-to-r from-pink-600 to-red-500 px-3 py-1 rounded-full text-sm font-bold">
//                   {overallStats.new} NEW STUDENTS
//                 </span>
//               )}
//             </p>
//           </div>
//           <div className="flex flex-col items-end gap-3">
//             <button
//               onClick={exportToExcel}
//               disabled={exporting || overallStats.total === 0}
//               className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-600"
//             >
//               {exporting ? (
//                 <>
//                   <RefreshCcw size={18} className="animate-spin" />
//                   Exporting...
//                 </>
//               ) : (
//                 <>
//                   <FileSpreadsheet size={18} />
//                   Get All Students data
//                 </>
//               )}
//             </button>

//             <div className="flex items-center gap-3">
//               <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
//                 <Database size={28} className="text-white" />
//               </div>
//               <div>
//                 <div className="text-2xl font-black">{overallStats.total}</div>
//                 <div className="text-sm text-blue-200">Total Students</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATUS SUMMARY CARDS - YEH ADD KIYA HAI */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//         <div
//           onClick={() => {
//             setSelectedDomain({ name: "NEW", icon: Clock });
//             setCurrentView("clients");
//             setClientsLoading(true);
//             fetch(
//               `$${import.meta.env.VITE_BACKEND_URL}/clients/filter?filterField=status&filterValue=new`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//                 },
//               },
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 setClients(data.data || []);
//                 setClientsLoading(false);
//               })
//               .catch((err) => {
//                 console.error(err);
//                 setClientsLoading(false);
//               });
//           }}
//           className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all duration-300 group relative"
//         >
//           {overallStats.new > 0 && (
//             <div className="absolute -top-2 -right-2">
//               <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
//                 <Sparkles size={10} />
//                 NEW
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-3xl font-black text-blue-700 mb-1">
//                 {overallStats.new || 0}
//               </div>
//               <div className="text-blue-600 font-semibold mb-1">
//                 New Students
//               </div>
//               <div className="text-sm text-blue-500">Require attention</div>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//               <Clock size={24} className="text-blue-600" />
//             </div>
//           </div>
//         </div>

//         <div
//           onClick={() => {
//             setSelectedDomain({ name: "IN PROGRESS", icon: RefreshCcw });
//             setCurrentView("clients");
//             setClientsLoading(true);
//             fetch(
//               `${import.meta.env.VITE_BACKEND_URL}/clients/filter?filterField=status&filterValue=in-progress`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//                 },
//               },
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 setClients(data.data || []);
//                 setClientsLoading(false);
//               })
//               .catch((err) => {
//                 console.error(err);
//                 setClientsLoading(false);
//               });
//           }}
//           className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:border-amber-300 transition-all duration-300 group"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-3xl font-black text-amber-700 mb-1">
//                 {overallStats.inProgress || 0}
//               </div>
//               <div className="text-amber-600 font-semibold mb-1">
//                 In Progress
//               </div>
//               <div className="text-sm text-amber-500">Active counseling</div>
//             </div>
//             <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
//               <RefreshCcw size={24} className="text-amber-600" />
//             </div>
//           </div>
//         </div>

//         <div
//           onClick={() => {
//             setSelectedDomain({ name: "COMPLETED", icon: CheckCircle });
//             setCurrentView("clients");
//             setClientsLoading(true);
//             fetch(
//               `${import.meta.env.VITE_BACKEND_URL}/clients/filter?filterField=status&filterValue=completed`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("counselorToken") || ""}`,
//                 },
//               },
//             )
//               .then((res) => res.json())
//               .then((data) => {
//                 setClients(data.data || []);
//                 setClientsLoading(false);
//               })
//               .catch((err) => {
//                 console.error(err);
//                 setClientsLoading(false);
//               });
//           }}
//           className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-3xl font-black text-emerald-700 mb-1">
//                 {overallStats.completed || 0}
//               </div>
//               <div className="text-emerald-600 font-semibold mb-1">
//                 Completed
//               </div>
//               <div className="text-sm text-emerald-500">
//                 Finished counseling
//               </div>
//             </div>
//             <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
//               <CheckCircle size={24} className="text-emerald-600" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-3xl font-black text-slate-700 mb-1">
//                 {overallStats.total || 0}
//               </div>
//               <div className="text-slate-600 font-semibold mb-1">
//                 Total Students
//               </div>
//               <div className="text-sm text-slate-500">Across all domains</div>
//             </div>
//             <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
//               <TrendingUp size={24} className="text-slate-600" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* DOMAIN CARDS */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-2xl font-black text-slate-800 mb-2">
//               Specialization Domains
//             </h2>
//             <p className="text-slate-500">
//               Select a domain to explore courses and students
//             </p>
//           </div>
//           <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
//             {loading ? "Loading..." : `${domainStats.length} domains available`}
//           </div>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
//               >
//                 <div className="h-14 w-14 bg-slate-200 rounded-xl mb-5"></div>
//                 <div className="h-6 bg-slate-200 rounded mb-2"></div>
//                 <div className="h-4 bg-slate-200 rounded mb-8"></div>
//                 <div className="h-10 bg-slate-200 rounded"></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {domainStats.map((domain) => {
//               const domainInfo = counselorDomains.find(
//                 (d) => d.name === domain.domain,
//               );
//               const Icon = domainInfo?.icon || Stethoscope;

//               return (
//                 <div
//                   key={domain.domain}
//                   onClick={() => handleDomainClick(domain)}
//                   className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer relative transition-all duration-300 group"
//                 >
//                   {/* NEW BADGE FOR DOMAIN */}
//                   {domain.hasNew && (
//                     <div className="absolute -top-2 -right-2 z-10">
//                       <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
//                         <Sparkles size={10} />
//                         NEW
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex items-start justify-between mb-5">
//                     <div
//                       className={`w-14 h-14 rounded-xl ${domainInfo?.bgColor || "bg-blue-50"} ${domainInfo?.color || "text-blue-600"} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
//                     >
//                       <Icon size={24} />
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-black text-slate-800">
//                         {domain.total}
//                       </div>
//                       <div className="text-xs text-slate-500">Students</div>
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold text-slate-800 mb-2">
//                     {domain.domain}
//                   </h3>
//                   <p className="text-sm text-slate-600 mb-4">
//                     {domainInfo?.description || "Professional domain"}
//                   </p>

//                   <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                     <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold group-hover:text-blue-700">
//                       View Details
//                       <ChevronRight
//                         size={16}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </div>
//                     {domain.hasNew && (
//                       <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderDomainCourses = () => (
//     <div>
//       <ScrollToTop />
//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleBackToDashboard}
//             className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
//           >
//             <ChevronLeft size={22} />
//           </button>
//           <div>
//             <h2 className="text-3xl font-black text-slate-800 mb-2">
//               {selectedDomain?.name} Courses
//             </h2>
//             <p className="text-slate-500">
//               Select a course to view enrolled students
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl">
//           <Home size={16} />
//           <span
//             className="hover:text-blue-600 cursor-pointer"
//             onClick={handleBackToDashboard}
//           >
//             Dashboard
//           </span>
//           <ChevronRight size={16} />
//           <span className="font-semibold text-blue-600">
//             {selectedDomain?.name}
//           </span>
//         </div>
//       </div>

//       {/* COURSE CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courseStats.length > 0 ? (
//           courseStats.map((course, index) => (
//             <div
//               key={index}
//               onClick={() => handleCourseClick(course)}
//               className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:border-blue-400 cursor-pointer group relative transition-all duration-300"
//             >
//               {/* NEW BADGE FOR COURSE */}
//               {course.hasNew && (
//                 <div className="absolute -top-2 -right-2 z-10">
//                   <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
//                     <Sparkles size={10} />
//                     NEW
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-center gap-4 mb-5">
//                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
//                   <BookOpen size={22} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700">
//                     {course.course}
//                   </h3>
//                   <p className="text-sm text-slate-500">
//                     {selectedDomain?.name} Domain
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-5 border-t border-slate-100">
//                 <div className="text-sm text-slate-600">
//                   {course.total} student{course.total !== 1 ? "s" : ""}
//                   {course.hasNew && (
//                     <span className="ml-2 text-red-500 font-semibold">
//                       • {course.new} new
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-blue-600 font-semibold flex items-center gap-1 group-hover:text-blue-700">
//                   View Students
//                   <ArrowRight
//                     size={18}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
//             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
//               <BookOpen size={32} className="text-slate-300" />
//             </div>
//             <h3 className="text-xl font-bold text-slate-400 mb-2">
//               No courses found
//             </h3>
//             <p className="text-slate-400">
//               No students enrolled in courses for {selectedDomain?.name}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderClients = () => (
//     <div>
//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={
//               selectedDomain?.stats
//                 ? handleBackToDomains
//                 : handleBackToDashboard
//             }
//             className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
//           >
//             <ChevronLeft size={22} />
//           </button>
//           <div>
//             <h2 className="text-3xl font-black text-slate-800 mb-2">
//               {selectedCourse
//                 ? `${selectedCourse.course} Students`
//                 : selectedDomain?.name || "Students"}
//             </h2>
//             <p className="text-slate-500">{clients.length} students found</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl">
//           <Home size={16} />
//           <span
//             className="hover:text-blue-600 cursor-pointer"
//             onClick={handleBackToDashboard}
//           >
//             Dashboard
//           </span>
//           <ChevronRight size={16} />
//           {selectedDomain?.stats && (
//             <>
//               <span
//                 className="hover:text-blue-600 cursor-pointer"
//                 onClick={handleBackToDomains}
//               >
//                 {selectedDomain.name}
//               </span>
//               <ChevronRight size={16} />
//             </>
//           )}
//           <span className="font-semibold text-blue-600">
//             {selectedCourse ? selectedCourse.course : selectedDomain?.name}
//           </span>
//         </div>
//       </div>

//       {clientsLoading ? (
//         <div className="py-20 text-center">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-slate-500 font-medium">
//             Loading students data...
//           </p>
//         </div>
//       ) : clients.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {clients.map((client) => {
//             const isNewStudent = isStudentNew(client);

//             return (
//               <div
//                 key={client._id}
//                 onClick={() => handleClientClick(client)}
//                 className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all duration-300 group relative"
//               >
//                 <ScrollToTop />
//                 {/* NEW BADGE FOR STUDENT */}
//                 {isNewStudent && (
//                   <div className="absolute -top-2 -right-2 z-10">
//                     <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
//                       <Sparkles size={10} />
//                       NEW
//                     </div>
//                   </div>
//                 )}

//                 {/* CARD HEADER */}
//                 <div className="flex items-start justify-between mb-5">
//                   <div className="flex items-center gap-4">
//                     <div className="relative">
//                       <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-50 transition-colors">
//                         {client.fullName?.charAt(0) || "U"}
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700">
//                         {client.fullName}
//                       </h3>
//                       <p className="text-sm text-slate-500 flex items-center gap-1">
//                         <MapPin size={12} />
//                         {client.city || "Location not set"}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDeleteModal(client);
//                     }}
//                     className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
//                     title="Delete Student"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>

//                 {/* CLIENT INFO */}
//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Mail size={14} />
//                     </div>
//                     <div className="truncate">
//                       <div className="text-xs text-slate-500">Email</div>
//                       <div className="font-medium truncate">{client.email}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Phone size={14} />
//                     </div>
//                     <div>
//                       <div className="text-xs text-slate-500">Phone</div>
//                       <div className="font-medium">{client.phone}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 text-sm">
//                     <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <GraduationCap size={14} />
//                     </div>
//                     <div>
//                       <div className="text-xs text-slate-500">Education</div>
//                       <div className="font-medium">{client.eduLevel}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* STATUS & ACTION */}
//                 <div className="pt-5 border-t border-slate-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`px-3 py-1.5 rounded-full text-xs font-bold ${
//                           client.status === "new"
//                             ? "bg-blue-100 text-blue-600"
//                             : client.status === "in-progress"
//                               ? "bg-amber-100 text-amber-600"
//                               : "bg-emerald-100 text-emerald-600"
//                         }`}
//                       >
//                         {client.status?.toUpperCase()}
//                       </span>
//                       {isNewStudent && (
//                         <span className="text-xs text-red-500 font-bold flex items-center gap-1">
//                           <Sparkles size={10} />
//                           UNSEEN
//                         </span>
//                       )}
//                     </div>
//                     <div className="text-blue-600 font-semibold text-sm flex items-center gap-1">
//                       View Details
//                       <ArrowRight
//                         size={16}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
//           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Users size={32} className="text-slate-300" />
//           </div>
//           <h3 className="text-xl font-bold text-slate-400 mb-2">
//             No students found
//           </h3>
//           <p className="text-slate-400">
//             {selectedCourse
//               ? `No students are enrolled in ${selectedCourse.course} course`
//               : "No students found"}
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   const renderClientDetail = () => {
//     if (!selectedClient) return null;
//     const isNewStudent = isStudentNew(selectedClient);
//     return (
//       <div>
//         <ScrollToTop />
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleBackToClients}
//               className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
//             >
//               <ChevronLeft size={22} />
//             </button>
//             <div>
//               <h2 className="text-3xl font-black text-slate-800 mb-2">
//                 Student Details
//               </h2>
//               <p className="text-slate-500">
//                 Complete information about {selectedClient.fullName}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl">
//             <Home size={16} />
//             <span
//               className="hover:text-blue-600 cursor-pointer"
//               onClick={handleBackToDashboard}
//             >
//               Dashboard
//             </span>
//             <ChevronRight size={16} />
//             {selectedDomain?.stats && (
//               <>
//                 <span
//                   className="hover:text-blue-600 cursor-pointer"
//                   onClick={handleBackToDomains}
//                 >
//                   {selectedDomain.name}
//                 </span>
//                 <ChevronRight size={16} />
//               </>
//             )}
//             {selectedCourse && (
//               <>
//                 <span
//                   className="hover:text-blue-600 cursor-pointer"
//                   onClick={handleBackToCourses}
//                 >
//                   {selectedCourse.course}
//                 </span>
//                 <ChevronRight size={16} />
//               </>
//             )}
//             <span className="font-semibold text-blue-600">
//               {selectedClient.fullName?.split(" ")[0]}
//             </span>
//           </div>
//         </div>

//         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 border-b border-slate-200">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//               <div className="flex items-center gap-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-white border-4 border-white shadow-lg rounded-2xl flex items-center justify-center font-black text-3xl text-slate-700">
//                     {selectedClient.fullName?.charAt(0) || "U"}
//                   </div>

//                   {isNewStudent && (
//                     <div className="absolute -top-2 -right-2">
//                       <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse flex items-center gap-2">
//                         <Sparkles size={12} />
//                         NEW STUDENT
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-black text-slate-800 mb-2">
//                     {selectedClient.fullName}
//                   </h3>
//                   <div className="flex flex-wrap items-center gap-4 text-slate-600">
//                     <div className="flex items-center gap-2">
//                       <MapPin size={16} className="text-blue-500" />
//                       <span>
//                         {selectedClient.city}, {selectedClient.state} , {selectedClient.country}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <BookOpen size={16} className="text-purple-500" />
//                       <span className="font-semibold">
//                         {selectedClient.course}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setDeleteModal(selectedClient)}
//                   className="px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 flex items-center gap-2 transition-colors"
//                 >
//                   <Trash2 size={18} />
//                   Delete
//                 </button>
              
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
//               <div className="space-y-6">
//                 <h4 className="text-lg font-bold text-slate-800 border-b pb-3">
//                   Personal Information
//                 </h4>
//                 <div className="space-y-5">
//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Email Address
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
//                         <Mail size={18} />
//                       </div>
//                       <div className="font-medium truncate">
//                         {selectedClient.email}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Phone Number
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
//                         <Phone size={18} />
//                       </div>
//                       <div className="font-medium">{selectedClient.phone}</div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Date of Birth
//                     </div>
//                     <div className="font-medium text-slate-800">
//                       {formatDate(selectedClient.dob)}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <h4 className="text-lg font-bold text-slate-800 border-b pb-3">
//                   Academic Information
//                 </h4>
//                 <div className="space-y-5">
//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Education Level
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
//                         <GraduationCap size={18} />
//                       </div>
//                       <div className="font-medium">
//                         {selectedClient.eduLevel}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Selected Course
//                     </div>
//                     <div className="font-medium text-blue-600 text-lg">
//                       {selectedClient.course}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Domain
//                     </div>
//                     <div className="font-medium">{selectedClient.domain}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <h4 className="text-lg font-bold text-slate-800 border-b pb-3">
//                   Status & Actions
//                 </h4>
//                 <div className="space-y-5">
//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//                       Current Status
//                     </div>
//                     <div className="flex gap-3">
//                       {["new", "in-progress", "completed"].map((status) => (
//                         <button
//                           key={status}
//                           onClick={() =>
//                             updateClientStatus(selectedClient._id, status)
//                           }
//                           className={`flex-1 py-3 rounded-xl text-sm font-bold uppercase transition-all ${
//                             selectedClient.status === status
//                               ? status === "new"
//                                 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                                 : status === "in-progress"
//                                   ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
//                                   : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md"
//                               : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                           }`}
//                         >
//                           {status}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//                       Joined Date
//                     </div>
//                     <div className="font-medium">
//                       {formatDateTime(selectedClient.createdAt)}
//                     </div>
//                     {isNewStudent && (
//                       <div className="text-sm text-red-500 font-bold mt-1 flex items-center gap-1">
//                         <Sparkles size={12} />
//                         New student
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {selectedClient.message && (
//               <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <MessageSquare size={20} className="text-slate-400" />
//                   <h4 className="text-lg font-bold text-slate-700">
//                     Student's Message
//                   </h4>
//                 </div>
//                 <div className="text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-200">
//                   "{selectedClient.message}"
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDeleteModal = () => {
//     if (!deleteModal) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//         <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
//           <div className="p-8">
//             <div className="flex flex-col items-center text-center">
//               <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
//                 <Trash2 size={36} className="text-red-500" />
//               </div>
//               <h3 className="text-2xl font-black text-slate-800 mb-3">
//                 Delete Student Record
//               </h3>
//               <p className="text-slate-600 mb-2">
//                 Are you sure you want to delete{" "}
//                 <span className="font-bold">{deleteModal.fullName}</span>?
//               </p>
//               <p className="text-sm text-slate-500 mb-8">
//                 This action cannot be undone. All data will be permanently
//                 removed.
//               </p>

//               <div className="flex gap-3 w-full">
//                 <button
//                   onClick={() => setDeleteModal(null)}
//                   className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => deleteClient(deleteModal._id)}
//                   disabled={isDeleting}
//                   className="flex-1 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
//                 >
//                   {isDeleting ? (
//                     <>
//                       <RefreshCcw size={18} className="animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete Permanently
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
//             <p className="text-xs text-slate-500">
//               Student ID: {deleteModal._id?.substring(0, 8)}... •{" "}
//               {deleteModal.course}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
//       <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
//         {currentView === "dashboard" && renderDashboard()}
//         {currentView === "domainCourses" && renderDomainCourses()}
//         {currentView === "clients" && renderClients()}
//         {currentView === "clientDetail" && renderClientDetail()}
//       </div>

//       {renderDeleteModal()}

//       {/* FOOTER */}
//       <div className="border-t border-slate-200 bg-white py-8">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">
//             <div>© 2026 CounselorPro. All rights reserved.</div>
//             <div className="flex items-center gap-6">
//               <div className="flex items-center gap-2">
//                 <Database size={14} />
//                 <span>Total Students: {overallStats.total}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Briefcase size={14} />
//                 <span>Active Domains: {domainStats.length}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock size={14} />
//                 <span>New Today: {overallStats.new}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounselorDashboard;



