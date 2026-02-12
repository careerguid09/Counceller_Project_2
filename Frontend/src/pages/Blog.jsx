import React, { useState } from "react";
import { motion } from "framer-motion";
import founderImg  from "../assets/images/Founder.png";


import {
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Heart,
  Brain,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Mail,
  Tag,
  Share2,
  ThumbsUp,
  Award,
  ShieldCheck,
  Star,
  PlayCircle,
  BookOpen,
  Filter,
  Eye,
  BookmarkPlus,
  TrendingUp as TrendingUpIcon,
  Sparkles,
  Globe,
  Target,
  Users,
  Phone,
  MapPin,
  Building,
  School,
  Stethoscope,
  FlaskConical,
  Syringe,
  Microscope,
  GraduationCap as GraduationCapIcon,
  BookText,
  Languages,
  FlaskRound as Flask,
  Wheat,
  University,
  BadgeCheck,
  CalendarCheck,
  UsersRound,
  Trophy,
} from "lucide-react";

const BlogContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState([]);

  const toggleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  const experts = [
    {

      role: "Founder & Director & Career Counsellor",
 image: founderImg, 
      specialty: "Medical & Management",
      articles: 45,
      rating: 4.9,
      experience: "9+ Years",
    },
  ];

  const featuredPosts = [
    {
      id: 1,
      title:
        "MBBS Admission 2026: Complete Guide for Direct Admission in Top Medical Colleges",
      excerpt:
        "Get complete information about MBBS admission process, eligibility, NEET scores, management quota seats, and direct admission options in top medical colleges across India. Expert guidance from 9+ years experienced counsellors.",
      category: "Medical",
      categoryColor: "from-emerald-500 to-teal-600",
      icon: <Stethoscope className="w-5 h-5" />,
      readTime: "10 min read",
      date: "Feb 10, 2026",
    
      authorImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200",
      tags: ["MBBS", "NEET", "Medical", "Direct Admission"],
      views: "3.8k",
     
      featured: true,
      location: "All India",
    },
    {
      id: 2,
      title:
        "B.Ed Admission 2026: How to Secure Seat in Top B.Ed Colleges with Placement Support",
      excerpt:
        "Complete guide for B.Ed and D.El.Ed admissions 2026. Learn about eligibility, entrance exams, direct admission options, and how we provide 100% placement assistance in reputed schools after course completion.",
      category: "Education",
      categoryColor: "from-amber-500 to-orange-600",
      icon: <School className="w-5 h-5" />,
      readTime: "8 min read",
      date: "Feb 08, 2026",
      authorImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200",
      tags: ["B.Ed", "D.El.Ed", "Teaching", "Placement"],
      views: "2.9k",

    
      featured: true,
      location: "MP, Bihar, UP",
    },
    {
      id: 3,
      title: "BSc Nursing & GNM Admission 2026: Hospital Placement Guaranteed",
      excerpt:
        "Comprehensive information about Nursing courses (ANM, GNM, BSc Nursing, MSc Nursing) admission process. Special focus on hospital placements and internship support in top multi-speciality hospitals.",
      category: "Nursing",
      categoryColor: "from-blue-500 to-indigo-600",
      icon: <Syringe className="w-5 h-5" />,
   
      date: "Feb 05, 2026",
    
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200",
      tags: ["Nursing", "GNM", "BSc Nursing", "Hospital Jobs"],
      views: "3.2k",

      featured: true,
      location: "All India",
    },
  ];

  const standardPosts = [
    {
      id: 4,
      title:
        "MBA/PGDM Admission 2026: Direct Admission in Top B-Schools with Placement",
      excerpt:
        "Get direct admission in top MBA/PGDM colleges across India. Special placement assistance in corporate companies. 500+ partner colleges. Loan and hostel facilities available.",
      category: "Management",
      categoryColor: "from-indigo-500 to-blue-600",
      icon: <Briefcase className="w-5 h-5" />,
     
      date: "Feb 07, 2026",
     
      authorImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800",
      tags: ["MBA", "PGDM", "Management", "Corporate Jobs"],

      location: "MP, UP, Bihar, Delhi",
    },
    {
      id: 5,
      title:
        "B.Tech/BE Admission 2026: Direct Engineering Admission in Top Colleges",
      excerpt:
        "Complete admission guidance for Diploma, B.Tech, M.Tech and PhD in Engineering. Direct admission options in top private and government colleges. Placement assistance in MNCs.",
      category: "Engineering",
      categoryColor: "from-purple-500 to-violet-600",
      icon: <GraduationCapIcon className="w-5 h-5" />,

      date: "Feb 06, 2026",
   
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1597733336794-12d05021d510?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
      tags: ["B.Tech", "Engineering", "Diploma", "M.Tech"],
 
      location: "MP, Bihar, UP, Rajasthan",
    },
    {
      id: 6,
      title:
        "B.Pharma & D.Pharma Admission 2026: Medical & Lab Placement Support",
      excerpt:
        "Pharmacy courses admission guide 2026. B.Pharma, D.Pharma, M.Pharma, Pharm D admission in top pharmacy colleges. Internship in leading pharma companies and hospital labs.",
      category: "Pharmacy",
      categoryColor: "from-green-500 to-emerald-600",
      icon: <FlaskConical className="w-5 h-5" />,
     
      date: "Feb 04, 2026",
      author: "Dr. Priya Sharma",
      authorImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
      tags: ["Pharmacy", "B.Pharma", "D.Pharma", "Medical Jobs"],


      location: "All India",
    },
    {
      id: 7,
      title:
        "Paramedical Courses 2026: X-Ray, BMLT, BPT Admission with Hospital Internship",
      excerpt:
        "Admission open for Paramedical courses: X-Ray Technician, BMLT/DMLT, BPT/MPT, Human Nutrition. 100% hospital internship support. Direct placement in diagnostic centers.",
      category: "Paramedical",
      categoryColor: "from-sky-500 to-cyan-600",
      icon: <Microscope className="w-5 h-5" />,
      date: "Feb 03, 2026",
 
      authorImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=800",
      tags: ["Paramedical", "BMLT", "X-Ray", "BPT"],

   
      location: "MP, Bihar, UP",
    },
    {
      id: 8,
      title: "BCA/MCA Admission 2026: IT & Software Career with Placement",
      excerpt:
        "Complete guidance for BCA, MCA, PGDCA admissions. Top colleges for computer applications. Placement support in IT companies. Internship opportunities during course.",
      category: "Vocational",
      categoryColor: "from-pink-500 to-rose-600",
      icon: <BookText className="w-5 h-5" />,
      date: "Feb 02, 2026",
     
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800",
      tags: ["BCA", "MCA", "IT", "Software Jobs"],

    
      location: "All India",
    },
    {
      id: 9,
      title:
        "Foreign Language Courses: German, French, Italian - Bachelor & Diploma",
      excerpt:
        "Admission open for Bachelor and Diploma in German, French, Italian, Chinese languages. Career opportunities as translator, interpreter, MNC jobs. Direct admission available.",
      category: "Language",
      categoryColor: "from-yellow-500 to-amber-600",
      icon: <Languages className="w-5 h-5" />,
      date: "Feb 01, 2026",
      author: "Dr. Priya Sharma",
      authorImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800",
      tags: ["German", "French", "Foreign Language", "Diploma"],

  
      location: "Online & Offline",
    },
    {
      id: 10,
      title:
        "BSc Agriculture Admission 2026: Govt & Private College Direct Entry",
      excerpt:
        "Complete admission process for BSc Agriculture and MSc Agriculture. Direct admission in top agricultural universities. Research and govt job placement assistance.",
      category: "Agriculture",
      categoryColor: "from-lime-500 to-green-600",
      icon: <Wheat className="w-5 h-5" />,
      date: "Jan 30, 2026",

      authorImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800",
      tags: ["Agriculture", "BSc Agri", "Farming", "Govt Jobs"],

 
      location: "MP, UP, Bihar",
    },
    {
      id: 11,
      title:
        "BA/BSc/BCom Graduation Admission 2026: Direct Entry in Top Colleges",
      excerpt:
        "Simple and fast admission process for BA, BSc, BCom and MA, MSc, MCom courses. Best colleges in MP, Bihar, UP with affordable fees. Scholarship available.",
      category: "Graduation",
      categoryColor: "from-gray-500 to-slate-600",
      icon: <University className="w-5 h-5" />,
 
      date: "Jan 28, 2026",
  
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800",
      tags: ["Graduation", "BA", "BSc", "BCom"],

     
      location: "MP, Bihar, UP",
    },
  ];

  const categories = [
    {
      name: "All",
      count: 86,
      icon: <TrendingUpIcon className="w-5 h-5" />,
      color: "from-slate-600 to-slate-700",
    },
    {
      name: "Medical",
      count: 18,
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Nursing",
      count: 12,
      icon: <Syringe className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Engineering",
      count: 15,
      icon: <GraduationCapIcon className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
    },
    {
      name: "Management",
      count: 14,
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-600",
    },
    {
      name: "Education",
      count: 10,
      icon: <School className="w-5 h-5" />,
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Pharmacy",
      count: 8,
      icon: <FlaskConical className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
  ];

  const webinars = [
    {
      title: "MBBS/BAMS Admission Process 2026",
      date: "Feb 15",
      time: "4:00 PM",
      expert: "Amit Sinha",
      spots: 28,
    },
    {
      title: "B.Ed & Teaching Career Guidance",
      date: "Feb 18",
      time: "3:00 PM",
      expert: "Dr. Priya Sharma",
      spots: 22,
    },
    {
      title: "MBA Placement & Corporate Jobs",
      date: "Feb 22",
      time: "5:00 PM",
     
      spots: 35,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(searchQuery + " SS Admission Vala")}`,
        "_blank",
      );
    }
  };

  return (
    <div className="bg-gradient-to-b  from-slate-50 to-white min-h-screen">
     
      <section className="relative pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-semibold mb-6 border border-indigo-200"
            >
              <Trophy className="w-4 h-4" />
              <span>15000+ Successful Admissions | 9+ Years Experience</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-700">
                SS Admission Vala
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Admission Guidance & Career Counselling
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              Complete admission guidance for Medical, Engineering, Management,
              Education, Paramedical and all professional courses across India.
              Expert counselling with placement support.
            </motion.p>

            {/* Google Active Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl mx-auto"
              onSubmit={handleSearch}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, colleges, admission guides..."
                  className="w-full pl-12 pr-32 py-4 rounded-xl bg-white border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-sm text-slate-500">Trending:</span>
                {[
                  "MBBS 2026",
                  "B.Ed Admission",
                  "MBA Placement",
                  "Nursing Jobs",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(tag + " SS Admission Vala")}`,
                        "_blank",
                      );
                    }}
                    className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-8/12">
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Featured Admission Guides
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Most Read This Week</span>
                  </div>
                </div>

                <div className="grid gap-8">
                  {featuredPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => toggleSavePost(post.id)}
                            className={`p-2 rounded-full backdrop-blur-sm ${
                              savedPosts.includes(post.id)
                                ? "bg-rose-500 text-white"
                                : "bg-white/90 text-slate-600 hover:text-rose-500"
                            } transition-all`}
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${post.categoryColor}`}
                          >
                            {post.category}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                            {post.location}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-10 h-10 rounded-full border-2 border-white shadow"
                            />
                            <div>
                              <p className="font-semibold text-slate-900">
                                {post.author}
                              </p>
                              <p className="text-sm text-slate-500">
                                {post.date} • {post.readTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-slate-500">
                            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="hover:text-indigo-600 transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                          <a href="#">{post.title}</a>
                        </h3>

                        <p className="text-slate-600 mb-6 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href="https://www.classcentral.com/report/most-popular-online-courses/"
                            className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                          >
                            Read Full Article
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Latest Admission Articles */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Latest Admission Updates 2026
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>Updated Daily</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {standardPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => toggleSavePost(post.id)}
                            className={`p-1.5 rounded-full backdrop-blur-sm ${
                              savedPosts.includes(post.id)
                                ? "bg-rose-500 text-white"
                                : "bg-white/90 text-slate-600 hover:text-rose-500"
                            } transition-all`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded text-white bg-gradient-to-r ${post.categoryColor}`}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </span>
                          <span className="text-sm text-slate-500">
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          <a href="#">{post.title}</a>
                        </h3>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-slate-900">
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-12 text-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 mx-auto">
                    <a href="https://www.worldbank.org/en/topic/education/overview#:~:text=Making%20smart%20and%20effective%20investments%20in%20people's,they%20need%20to%20succeed%20in%20today's%20world.">
                      More Articles{" "}
                    </a>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-4/12">
              <div className="space-y-8 sticky top-24">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Get Free Counselling Now
                  </h3>
                  <p className="text-indigo-100 mb-6">
                    Our team will call soon.
                  </p>
             
                  <p className="text-xs text-indigo-200 mt-4 text-center">
                    15000+ students already admitted
                  </p>
                </div>

                {/* Counter Section */}
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                    Our Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-indigo-50 rounded-xl">
                      <div className="text-3xl font-bold text-indigo-600">
                        15000+
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Students Admitted
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600">
                        9+
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Years Experience
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-3xl font-bold text-green-600">
                        500+
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Partner Colleges
                      </p>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-xl">
                      <div className="text-3xl font-bold text-amber-600">
                        100%
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Guidance Support
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Expert Counsellors
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {experts.map((expert, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow group-hover:border-indigo-300 transition-colors"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">
                            {expert.rating}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {expert.name}
                          </h4>
                          <p className="text-sm text-slate-600 mb-1">
                            {expert.role}
                          </p>
                          <p className="text-xs text-slate-500">
                            {expert.experience} • {expert.specialty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3 bg-slate-50 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
                     <a href="/contact"> Book Free Counselling</a>
        
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <BadgeCheck className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-slate-900">
                      Quick Questions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="font-medium text-slate-900">
                        Q. Direct admission possible?
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        Yes, with proper guidance & eligibility.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="font-medium text-slate-900">
                        Q. Loan & hostel available?
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        Yes available in many colleges.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="font-medium text-slate-900">
                        Q. Counselling charges?
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        Free counselling available.
                      </p>
                    </div>
                  </div>

              
                </div>

                {/* Emergency Admission Support */}
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8 text-white shadow-lg">
  <div className="flex items-center gap-3 mb-4">
    <Phone className="w-8 h-8 text-white" />
    <h3 className="text-xl font-bold">
      Urgent Admission Support
    </h3>
  </div>
  <p className="text-rose-100 mb-6">
    Limited seats available for 2026. Get immediate admission assistance.
  </p>
  <div className="space-y-3">
    {/* ✅ CALL BUTTON - Pura button clickable */}
    <a 
      href="tel:+917415666361"
      className="w-full bg-white text-rose-600 py-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors shadow-lg flex items-center justify-center gap-2"
    >
      <Phone className="w-5 h-5" />
      Call Now: +91 74156 66361
    </a>
    
    {/* ✅ WHATSAPP BUTTON - Pura button clickable */}
    <a 
      href="https://wa.me/917415666361?text=Hello%20SS%20Admission%20Vala,%20I%20need%20admission%20guidance%20for%202026"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2"
    >
      <MessageCircle className="w-5 h-5" />
      WhatsApp Now
    </a>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Free Counselling */}
<section className="py-20">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Admission Open 2026</span>
        </div>

        <h2 className="text-4xl font-bold mb-6">
          Get Free Counselling Now
        </h2>

        <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
          Our expert counsellors will guide you for the right career path.
          Limited seats available in top colleges.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* ✅ CALL BUTTON - Phone App Khulega */}
          <a 
            href="tel:+917415666361"
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Call Now: +91 74156 66361
          </a>
          
          {/* ✅ WHATSAPP BUTTON - WhatsApp Chat Khulega */}
          <a 
            href="https://wa.me/917415666361?text=Hello%20SS%20Admission%20Vala,%20I%20need%20free%20counselling%20for%20admission%202026.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Now
          </a>
        </div>

        <p className="text-sm text-indigo-200 mt-6">
          Our team will call you soon. 
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default BlogContent;
