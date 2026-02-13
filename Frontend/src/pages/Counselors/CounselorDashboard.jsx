import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import { toast } from "react-toastify";
import {
  Stethoscope, Pill, UserRound, Microscope, Settings, Briefcase, GraduationCap,
  BookOpen, Laptop, Languages, Leaf, Presentation, Clock, ChevronRight,
  MapPin, CheckCircle, ChevronLeft, Mail, Phone, MessageSquare, RefreshCcw,
  Trash2, Users, ArrowRight, Home, TrendingUp, FileSpreadsheet, Database, Sparkles,
} from "lucide-react";

// Redux Thunks
import {
  getDomainStats,
  getCourseStats,
  getStudentsByCourse,
  markStudentViewed,
  markDomainViewed,
  markCourseViewed,
  deleteStudent,
  updateStudentStatus,
  dynamicFilterStudents,
} from "../../Redux-toolkit/features/studentsThunks.js";

const CounselorDashboard = () => {
  const dispatch = useDispatch();

  // --- REDUX STATE ---
  const { students, stats, loading, error } = useSelector((state) => state.students);
  const domainStats = stats?.domain || [];
  const courseStats = stats?.course || [];
  const overallStats = stats?.overall || { total: 0, new: 0, inProgress: 0, completed: 0 };

  // --- LOCAL UI STATE ---
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [counselorProfile, setCounselorProfile] = useState({ name: "Dr. Sandeep", email: "sandeep@careerguide.com" });

  // Domain Metadata for UI Icons and Descriptions (Old UI Data)
  const counselorDomains = [

    { id: 1, name: "MEDICAL", icon: Stethoscope, bgColor: "bg-red-50", color: "text-red-600", description: "Healthcare and surgical medical programs" },
    { id: 2, name: "PHARMACY", icon: Pill, bgColor: "bg-emerald-50", color: "text-emerald-600", description: "Pharmaceutical sciences and drug research" },
    { id: 3, name: "NURSING", icon: UserRound, bgColor: "bg-blue-50", color: "text-blue-600", description: "Clinical nursing and healthcare assistance" },
    { id: 4, name: "PARAMEDICAL", icon: Microscope, bgColor: "bg-purple-50", color: "text-purple-600", description: "Paramedical and allied health services" },
    { id: 5, name: "ENGINEERING", icon: Settings, bgColor: "bg-orange-50", color: "text-orange-600", description: "Technical and technological innovations" },
    { id: 6, name: "MANAGEMENT", icon: Briefcase, bgColor: "bg-indigo-50", color: "text-indigo-600", description: "Business leadership and administration" },
    { id: 7, name: "GRADUATION", icon: BookOpen, bgColor: "bg-teal-50", color: "text-teal-600", description: "Undergraduate arts and science degrees" },
    { id: 8, name: "POST GRADUATION", icon: GraduationCap, bgColor: "bg-cyan-50", color: "text-cyan-600", description: "Advanced master and research programs" },
    { id: 9, name: "VOCATIONAL", icon: Laptop, bgColor: "bg-pink-50", color: "text-pink-600", description: "Skill-based technical training" },
    { id: 10, name: "LANGUAGES", icon: Languages, bgColor: "bg-yellow-50", color: "text-yellow-600", description: "Global communication and linguistics" },
    { id: 11, name: "AGRICULTURE", icon: Leaf, bgColor: "bg-lime-50", color: "text-lime-600", description: "Farm science and agricultural technology" },
    { id: 12, name: "EDUCATION", icon: Presentation, bgColor: "bg-amber-50", color: "text-amber-600", description: "Teacher training and pedagogical studies" },

    {
      id: 1,
      name: "MEDICAL",
      icon: Stethoscope,
      description: "Healthcare and surgical medical programs",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      name: "PHARMACY",
      icon: Pill,
      description: "Pharmaceutical sciences and drug research",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      name: "NURSING",
      icon: UserRound,
      description: "Clinical nursing and healthcare assistance",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      name: "PARAMEDICAL",
      icon: Microscope,
      description: "Paramedical and allied health services",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 5,
      name: "ENGINEERING",
      icon: Settings,
      description: "Technical and technological innovations",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 6,
      name: "MANAGEMENT",
      icon: Briefcase,
      description: "Business leadership and administration",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: 7,
      name: "GRADUATION",
      icon: BookOpen,
      description: "Graduate arts and science degrees",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      id: 8,
      name: "POST GRADUATION",
      icon: GraduationCap,
      description: "Advanced master and research programs",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      id: 9,
      name: "VOCATIONAL",
      icon: Laptop,
      description: "Skill-based technical training",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: 10,
      name: "LANGUAGES",
      icon: Languages,
      description: "Global communication and linguistics",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: 11,
      name: "AGRICULTURE",
      icon: Leaf,
      description: "Farm science and agricultural technology",
      color: "text-lime-600",
      bgColor: "bg-lime-50",
    },
    {
      id: 12,
      name: "EDUCATION",
      icon: Presentation,
      description: "Teacher training and pedagogical studies",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  useEffect(() => {
    // FIX: Only fetch if we don't have data, OR fetch silently in background
    if (stats.domain.length === 0) {
      dispatch(getDomainStats());
    } else {
      // Data exists! Optionally refresh in background without showing "Loading..."
      // This is called "Stale-While-Revalidate"
      dispatch(getDomainStats()); 
    }
  }, [dispatch]);

  // --- UTILS ---
  const formatDate = (ds) => ds ? new Date(ds).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "N/A";
  const formatDateTime = (ds) => ds ? new Date(ds).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "N/A";
  
  const isStudentNew = (student) => {
    if (!student.newAt) return student.isNew;
    if (student.studentViewed) return false;
    const newAt = new Date(student.newAt);
    const now = new Date();
    const daysDiff = (now - newAt) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7 && student.isNew;
  };

  // --- HANDLERS ---
  // const handleDomainClick = (domain) => {
  //   if (domain.hasNew) dispatch(markDomainViewed(domain.domain));
  //   const info = counselorDomains.find((d) => d.name === domain.domain) || counselorDomains[0];
  //   setSelectedDomain({ ...info, stats: domain });
  //   dispatch(getCourseStats(domain.domain));
  //   window.scrollTo(0, 0);
  //   setCurrentView("domainCourses");
  // };
  const handleDomainClick = (domain) => {
    if (domain.hasNew) dispatch(markDomainViewed(domain.domain));
    const info = counselorDomains.find((d) => d.name === domain.domain) || counselorDomains[0];
    setSelectedDomain({ ...info, stats: domain });
    
    // Still call this to keep backend updated, but UI won't show a loader
    dispatch(getCourseStats(domain.domain)); 
    
    setCurrentView("domainCourses");
  };

 const handleCourseClick = (course) => {
    if (course.hasNew) dispatch(markCourseViewed(course.course));
    setSelectedCourse(course);
    
    
    dispatch(getStudentsByCourse(course.course));
    
    setCurrentView("clients");
  };

  const handleClientClick = (client) => {
    if (client.isNew && !client.studentViewed) dispatch(markStudentViewed(client._id));
    setSelectedClient({ ...client, studentViewed: true, isNew: false });
    window.scrollTo(0, 0);
    setCurrentView("clientDetail");
  };

  const deleteClientHandler = (clientId) => {
    dispatch(deleteStudent(clientId)).unwrap()
      .then(() => {
        toast.success("Student deleted successfully ✅");
        setDeleteModal(null);
        dispatch(getDomainStats());
        setCurrentView("clients");
      })
      .catch((err) => toast.error(err));
  };

  const updateClientStatusHandler = (clientId, status) => {
    dispatch(updateStudentStatus({ id: clientId, status })).unwrap()
      .then((updatedClient) => {
        toast.success("Client status updated 🔄");
        const clientObj = updatedClient.client || updatedClient;
        setSelectedClient(clientObj);
        dispatch(getDomainStats());
      });
  };

  // const handleStatusFilter = (status) => {
  //   setSelectedDomain({ name: status.toUpperCase(), icon: TrendingUp });
  //   dispatch(dynamicFilterStudents({ filterField: 'status', filterValue: status }));
  //   window.scrollTo(0, 0);
  //   setCurrentView("clients");
  // };


  const handleStatusFilter = (status) => {
    setSelectedDomain({ name: status.toUpperCase(), icon: TrendingUp });
    dispatch(dynamicFilterStudents({ filterField: 'status', filterValue: status }));
    setCurrentView("clients");
    window.scrollTo(0, 0);
  };
  const exportToExcel = async () => {
    try {
      setExporting(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clients/export`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("counselorToken")}` }
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `Students_Data_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } catch (err) { toast.error("Export failed"); } finally { setExporting(false); }
  };

  const handleBackToDashboard = () => { setCurrentView("dashboard"); dispatch(getDomainStats()); window.scrollTo(0, 0); };
  const handleBackToDomains = () => { setCurrentView("domainCourses"); setSelectedCourse(null); window.scrollTo(0, 0); };
  const handleBackToClients = () => { setCurrentView("clients"); setSelectedClient(null); window.scrollTo(0, 0); };

  // --- RENDER FUNCTIONS ---




const renderDashboard = () => {
  const isDashboardEmpty = !overallStats || overallStats.total === 0;

  return (
    <div>
      <ScrollToTop />
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 mb-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-800/20 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-black mb-4">Welcome back, {counselorProfile?.name}!</h1>
            <p className="text-blue-200 text-lg">
              Manage {overallStats.total || 0} students across {domainStats.length || 0} domains.
              {overallStats.new > 0 && (
                <span className="ml-2 bg-gradient-to-r from-pink-600 to-red-500 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  {overallStats.new} NEW STUDENTS
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <button 
              onClick={exportToExcel} 
              disabled={exporting || isDashboardEmpty} 
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${isDashboardEmpty ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
              <FileSpreadsheet size={18} /> Get All Students Data
            </button>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"><Database size={28}/></div>
              <div><div className="text-2xl font-black">{overallStats.total || 0}</div><div className="text-sm text-blue-200">Total Students</div></div>
            </div>
          </div>
        </div>
      </div>

      {isDashboardEmpty ? (
        /* --- HIGH-END EMPTY STATE MESSAGE --- */
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 text-center shadow-sm">
          <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mb-6 rotate-3">
            <Users size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3">No Students Assigned</h2>
          <p className="text-slate-500 max-w-md text-lg">
            It looks like there are currently no students registered in your assigned domains. 
            Once enrollment begins, student analytics will appear here.
          </p>
          <div className="mt-8 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200 animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "New Students", val: overallStats.new, color: "text-blue-700", icon: Clock, bg: "from-blue-50", type: 'new', sub: 'Require attention' },
              { label: "In Progress", val: overallStats.inProgress, color: "text-amber-700", icon: RefreshCcw, bg: "from-amber-50", type: 'in-progress', sub: 'Active counseling' },
              { label: "Completed", val: overallStats.completed, color: "text-emerald-700", icon: CheckCircle, bg: "from-emerald-50", type: 'completed', sub: 'Finished counseling' },
              { label: "Total Students", val: overallStats.total, color: "text-slate-700", icon: TrendingUp, bg: "from-slate-50", type: 'total', sub: 'Across all domains' }
            ].map((item, i) => (
              <div key={i} onClick={() => item.type !== 'total' && handleStatusFilter(item.type)} className={`bg-gradient-to-br ${item.bg} to-white border border-slate-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all group relative`}>
                {item.type === 'new' && item.val > 0 && <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse flex items-center gap-1"><Sparkles size={10} /> NEW</div>}
                <div className="flex items-center justify-between">
                  <div><div className={`text-3xl font-black ${item.color} mb-1`}>{item.val || 0}</div><div className={`${item.color} font-semibold`}>{item.label}</div><div className="text-xs text-slate-400 mt-1">{item.sub}</div></div>
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors"><item.icon size={24} className={item.color} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* Domains Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div><h2 className="text-2xl font-black text-slate-800 mb-2">Specialization Domains</h2><p className="text-slate-500">Select a domain to explore courses and students</p></div>
              <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">{domainStats.length} domains available</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {domainStats.map((domain) => {
                const info = counselorDomains.find(d => d.name === domain.domain) || counselorDomains[0];
                return (
                  <div key={domain.domain} onClick={() => handleDomainClick(domain)} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer relative transition-all duration-300 group">
                    <ScrollToTop />
                    {domain.hasNew && <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"><Sparkles size={10} />NEW</div>}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-xl ${info.bgColor} ${info.color} flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm`}><info.icon size={24} /></div>
                      <div className="text-right"><div className="text-2xl font-black text-slate-800">{domain.total}</div><div className="text-xs text-slate-500">Students</div></div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{domain.domain}</h3>
                    <p className="text-sm text-slate-600 mb-4 h-10 overflow-hidden">{info.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold group-hover:text-blue-700">View Details <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></div>
                      {domain.hasNew && <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const renderDomainCourses = () => {
  // Check if there are actually any courses to display
  const hasCourses = courseStats && courseStats.length > 0;

  return (
    <div>
      <ScrollToTop />
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button onClick={handleBackToDashboard} className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
            <ChevronLeft size={22} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">{selectedDomain?.name} Courses</h2>
            <p className="text-slate-500">
              {hasCourses ? "Select a course to view enrolled students" : "No courses found in this domain"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl">
          <Home size={16} />
          <span onClick={handleBackToDashboard} className="cursor-pointer hover:text-blue-600">Dashboard</span>
          <ChevronRight size={16} />
          <span className="font-semibold text-blue-600">{selectedDomain?.name}</span>
        </div>
      </div>

      {/* Conditional Rendering: Grid vs Empty State */}
      {hasCourses ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseStats.map((course, index) => (
            <div 
              key={index} 
              onClick={() => handleCourseClick(course)} 
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:border-blue-400 cursor-pointer group relative transition-all duration-300"
            >
              {course.hasNew && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                  <Sparkles size={10} />NEW
                </div>
              )}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700">{course.course}</h3>
                  <p className="text-sm text-slate-500">{selectedDomain?.name} Domain</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <div className="text-sm text-slate-600">
                  {course.total} students {course.hasNew && <span className="ml-1 text-red-500 font-semibold">• {course.new} new</span>}
                </div>
                <div className="text-blue-600 font-semibold flex items-center gap-1 group-hover:text-blue-700">
                  View Students <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- BEST UI EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6">
            <BookOpen size={40} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No Students Enrolled</h3>
          <p className="text-slate-500 max-w-sm mb-8">
            It looks like there are currently no students or active courses for the <span className="font-semibold text-slate-700">"{selectedDomain?.name}"</span> domain.
          </p>
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <ChevronLeft size={18} />
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

  const renderClients = () => (
    <div>
        <ScrollToTop />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <button onClick={handleBackToDomains} className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"><ChevronLeft size={22} /></button>
          <div><h2 className="text-3xl font-black text-slate-800 mb-2">{selectedCourse?.course || selectedDomain?.name} Students</h2><p className="text-slate-500">{students.length} students found</p></div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl"><Home size={16} /><span onClick={handleBackToDashboard} className="cursor-pointer hover:text-blue-600">Dashboard</span><ChevronRight size={16} /><span className="font-semibold text-blue-600 truncate max-w-[100px]">{selectedCourse?.course || selectedDomain?.name}</span></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((client) => (
          <div key={client._id} onClick={() => handleClientClick(client)} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all duration-300 group relative">
            {isStudentNew(client) && <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"><Sparkles size={10} />NEW</div>}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-50 transition-colors">{client.fullName?.charAt(0) || "U"}</div>
                <div><h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700">{client.fullName}</h3><p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={12} />{client.city || "Location not set"}</p></div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setDeleteModal(client); }} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18} /></button>
            </div>
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm"><div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Mail size={14} /></div><span className="truncate">{client.email}</span></div>
                <div className="flex items-center gap-3 text-sm"><div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><Phone size={14} /></div><span>{client.phone}</span></div>
            </div>
            <div className="pt-5 border-t flex items-center justify-between">
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${client.status === "new" ? "bg-blue-100 text-blue-600" : client.status === "in-progress" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>{client.status}</span>
              <div className="text-blue-600 font-semibold text-sm flex items-center gap-1">View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClientDetail = () => {
    if (!selectedClient) return null;
    const isNew = isStudentNew(selectedClient);
    return (
      <div>
          <ScrollToTop />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button onClick={handleBackToClients} className="p-3 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"><ChevronLeft size={22} /></button>
            <div><h2 className="text-3xl font-black text-slate-800 mb-2">Student Details</h2><p className="text-slate-500">Complete information about {selectedClient.fullName}</p></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2.5 rounded-xl"><Home size={16} /><span className="hover:text-blue-600 cursor-pointer" onClick={handleBackToDashboard}>Dashboard</span><ChevronRight size={16} /><span className="font-semibold text-blue-600">{selectedClient.fullName?.split(" ")[0]}</span></div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white border-4 border-white shadow-lg rounded-2xl flex items-center justify-center font-black text-3xl text-slate-700">{selectedClient.fullName?.charAt(0) || "U"}</div>
                  {isNew && <div className="absolute -top-2 -right-2"><div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse flex items-center gap-2"><Sparkles size={12} /> NEW STUDENT</div></div>}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">{selectedClient.fullName}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-blue-500" /> <span>{selectedClient.city}, {selectedClient.state}</span></div>
                    <div className="flex items-center gap-2"><BookOpen size={16} className="text-purple-500" /> <span className="font-semibold">{selectedClient.course}</span></div>
                  </div>
                </div>
              </div>
              <button onClick={() => setDeleteModal(selectedClient)} className="px-5 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 flex items-center gap-2 transition-colors"><Trash2 size={18} /> Delete</button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 border-b pb-3">Personal Information</h4>
                <div className="space-y-5">
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</div><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Mail size={18} /></div><div className="font-medium truncate">{selectedClient.email}</div></div></div>
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</div><div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><Phone size={18} /></div><div className="font-medium">{selectedClient.phone}</div></div></div>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 border-b pb-3">Academic Information</h4>
                <div className="space-y-5">
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Education Level</div><div className="flex items-center gap-3"><div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><GraduationCap size={18} /></div><div className="font-medium">{selectedClient.eduLevel}</div></div></div>
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Selected Course</div><div className="font-medium text-blue-600 text-lg">{selectedClient.course}</div></div>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-slate-800 border-b pb-3">Status & Actions</h4>
                <div className="space-y-5">
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Current Status</div><div className="flex gap-3">{["new", "in-progress", "completed"].map((s) => (<button key={s} onClick={() => updateClientStatusHandler(selectedClient._id, s)} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${selectedClient.status === s ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{s}</button>))}</div></div>
                  <div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Joined Date</div><div className="font-medium">{formatDateTime(selectedClient.createdAt)}</div></div>
                </div>
              </div>
            </div>
            {selectedClient.message && (
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4"><MessageSquare size={20} className="text-slate-400" /><h4 className="text-lg font-bold text-slate-700">Student's Message</h4></div>
                <div className="text-slate-600 leading-relaxed bg-white p-5 rounded-xl border border-slate-200 italic">"{selectedClient.message}"</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 pb-20">
        <ScrollToTop />
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-20"><RefreshCcw className="animate-spin mx-auto mb-4" /> Loading Dashboard...</div>
        ) : (
          <>
            {currentView === "dashboard" && renderDashboard()}
            {currentView === "domainCourses" && renderDomainCourses()}
            {currentView === "clients" && renderClients()}
            {currentView === "clientDetail" && renderClientDetail()}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">
          <div>© 2026 CounselorPro. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><Database size={14} /><span>Total Students: {overallStats.total}</span></div>
            <div className="flex items-center gap-2"><Clock size={14} /><span>New Today: {overallStats.new}</span></div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl transition-all border border-slate-100">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6"><Trash2 size={36} /></div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Delete Student Record</h3>
            <p className="text-slate-600 mb-8">Are you sure you want to delete <b>{deleteModal.fullName}</b>? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
              <button onClick={() => deleteClientHandler(deleteModal._id)} className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselorDashboard;
























