import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Brain,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Clock,
  Globe,
  Award,
  Sparkles,
  Headphones,
  School,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const pillars = [
  {
    id: "experience",
    title: "9+ Years of Excellence",
    subtitle: "Legacy of Trust",
    description:
      "With nearly a decade of focused industry presence, we have mastered the nuances of the education sector, providing students with unparalleled insights and reliability.",
    icon: <Award className="w-8 h-8" />,
    color: "blue",
    points: ["Established 2015", "Government Registered", "100% Transparency"],
  },
  {
    id: "results",
    title: "15,000+ Admissions",
    subtitle: "Proven Success",
    description:
      "Our track record speaks for itself. We have successfully guided thousands of students into prestigious universities across engineering, medical, and management streams.",
    icon: <Users className="w-8 h-8" />,
    color: "indigo",
    points: [
      "Tier-1 College Network",
      "Scholarship Assistance",
      "Verified Placements",
    ],
  },
  {
    id: "support",
    title: "All India Support",
    subtitle: "Nationwide Reach",
    description:
      "Geography is no barrier to quality education. We provide end-to-end admission support for colleges across every state in India, from documentation to final seat booking.",
    icon: <Globe className="w-8 h-8" />,
    color: "cyan",
    points: [
      "Centralized Helpdesk",
      "Local Campus Tours",
      "Virtual Consultations",
    ],
  },
  {
    id: "counseling",
    title: "Expert Counseling",
    subtitle: "Direct Pathways",
    description:
      "Our expert counselors don't just fill forms; they build careers. We offer direct admission guidance and strategic roadmaps tailored to your score and budget.",
    icon: <UserCheck className="w-8 h-8" />,
    color: "purple",
    points: ["Direct Seat Booking", "Profile Building", "Budget Optimization"],
  },
];

const ExpertiseCard = ({ pillar, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const colors = {
    blue: "from-blue-500 to-blue-700",
    indigo: "from-indigo-500 to-indigo-700",
    cyan: "from-cyan-400 to-cyan-600",
    purple: "from-purple-500 to-purple-700",
  };

  const softBgs = {
    blue: "bg-blue-50 dark:bg-blue-900/10",
    indigo: "bg-indigo-50 dark:bg-indigo-900/10",
    cyan: "bg-cyan-50 dark:bg-cyan-900/10",
    purple: "bg-purple-50 dark:bg-purple-900/10",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-full flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 cursor-default ${
        darkMode
          ? "bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-900/60"
          : "bg-white border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-100"
      } overflow-hidden group`}
    >
      {/* Dynamic Glow Effect */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full blur-3xl transition-opacity duration-700 ${isHovered ? "opacity-40" : "opacity-0"} bg-gradient-to-br ${colors[pillar.color]}`}
      />

      {/* Icon Area */}
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg ${
          darkMode
            ? "bg-slate-800 text-white"
            : `${softBgs[pillar.color]} text-blue-600`
        }`}
      >
        <div
          className={`p-3 rounded-xl bg-gradient-to-br shadow-inner text-white ${colors[pillar.color]}`}
        >
          {pillar.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block ${darkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          {pillar.subtitle}
        </span>
        <h3 className="text-2xl font-bold mb-4 leading-tight">
          {pillar.title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-6 font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {pillar.description}
        </p>

        {/* Feature Points with enhanced bullet UI */}
        <ul className="space-y-3">
          {pillar.points.map((point, i) => (
            <li key={i} className="flex items-center gap-3 text-sm group/item">
              <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110">
                <CheckCircle2 size={12} className="text-emerald-500" />
              </div>
              <span
                className={`font-semibold transition-colors ${darkMode ? "text-gray-300 group-hover/item:text-white" : "text-slate-700 group-hover/item:text-slate-900"}`}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const faqs = [
  {
    question: "Direct admission possible?",
    answer: "Yes, with proper guidance & eligibility",
  },
  {
    question: "Loan & hostel available?",
    answer: "Yes available in many colleges",
  },
  {
    question: "How do I choose the right counselor?",
    answer:
      "During your initial discovery session, we assess your primary needs and personality type to match you with a specialist from our team who has the most relevant expertise.",
  },
  {
    question: "Which courses available?",
    answer: "Medical, B.Ed, Nursing, MBA, Engineering & all.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or reschedule up to 24 hours before your session without any charges. We understand emergencies happen.",
  },
];

const testimonials = [
  {
    name: "Rahul",
    role: "Patna",
    content:
      "SS Admission Vala helped me get BAMS admission and internship support. Very trusted team.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    name: "Pooja",
    role: "Bhopal",
    content:
      "I got B.Ed admission and now teaching in school. Thank you SS Admission Vala.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=rahul",
  },
  {
    name: "Neha",
    role: "Gaya",
    content:
      "Best consultancy for nursing admission. They also guided for placement.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=anjali",
  },
];

const FAQItem = ({ faq, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      className={`border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } py-4`}
    >
      <button
        className="w-full flex justify-between items-center text-left hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-blue-600" />
          ) : (
            <Plus
              className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p
              className={`pt-3 ${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, darkMode }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`rounded-xl p-6 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    } border shadow-md`}
  >
    <div className="flex items-center gap-3 mb-4">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-12 h-12 rounded-full border-2 border-blue-500"
      />
      <div>
        <h4
          className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          {testimonial.name}
        </h4>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {testimonial.role}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < testimonial.rating
              ? "text-yellow-500 fill-yellow-500"
              : darkMode
                ? "text-gray-700"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>

    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      "{testimonial.content}"
    </p>
  </motion.div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors pt-5 duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <section
        className={`relative min-h-[90vh] flex items-center overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-100"
        }`}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className={darkMode ? "text-white" : "text-gray-900"}>
                    Best Admission Guidance
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    & Career Counselling
                  </span>
                </h1>

                <p
                  className={`text-lg md:text-xl mb-8 max-w-xl leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  SS Admission Vala provides complete admission guidance for
                  Medical, Engineering, Management, Education, Paramedical and
                  all professional courses across India. We help students choose
                  the right career and secure admission in top colleges with
                  expert counselling.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Link to="/contact">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span>Start Your Journey</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link to="/about">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-8 py-3.5 rounded-xl font-semibold border-2 transition-all duration-300 ${
                        darkMode
                          ? "border-gray-700 text-gray-300 hover:border-blue-500 hover:text-blue-400 bg-gray-800"
                          : "border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-700 bg-white"
                      }`}
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden shadow-md"
                        >
                          <img
                            src={`https://i.pravatar.cc/150?img=${i + 30}`}
                            alt="Happy client"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                      >
                        10,000+ Happy Clients
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg shadow-sm border ${
                      darkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                      >
                        4.9/5
                      </p>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        from 15,000+ verified sessions
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - 3D Sphere Animation */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10">
                  <div className="relative w-full h-full">
                    {/* Main 3D Sphere Container */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{
                          rotateY: 360,
                          rotateX: 20,
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative w-64 h-64 lg:w-80 lg:h-80"
                      >
                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

                        {/* Animated Rings */}
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-full border-2 border-blue-300/50 dark:border-blue-500/30"
                        />

                        <motion.div
                          animate={{
                            rotate: -360,
                            scale: [1, 0.9, 1],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-4 rounded-full border-2 border-purple-300/50 dark:border-purple-500/30"
                        />

                        <motion.div
                          animate={{
                            rotate: 180,
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-8 rounded-full border-2 border-pink-300/50 dark:border-pink-500/30"
                        />

                        {/* Floating Icons */}
                        {[
                          {
                            icon: (
                              <Brain className="w-10 h-10 lg:w-12 lg:h-12" />
                            ),
                            color: "text-blue-500",
                            position:
                              "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                          },
                          {
                            icon: (
                              <Heart className="w-10 h-10 lg:w-12 lg:h-12" />
                            ),
                            color: "text-pink-500",
                            position:
                              "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
                          },
                          {
                            icon: (
                              <Briefcase className="w-10 h-10 lg:w-12 lg:h-12" />
                            ),
                            color: "text-indigo-500",
                            position:
                              "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                          },
                          {
                            icon: (
                              <GraduationCap className="w-10 h-10 lg:w-12 lg:h-12" />
                            ),
                            color: "text-amber-500",
                            position:
                              "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            className={`absolute ${item.position} ${item.color}`}
                            animate={{
                              y: [0, -15, 0],
                              rotateY: [0, 180, 360],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: index * 0.5,
                              ease: "easeInOut",
                            }}
                          >
                            <div
                              className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl ${darkMode ? "shadow-blue-900/20" : "shadow-blue-200"}`}
                            >
                              {item.icon}
                            </div>
                          </motion.div>
                        ))}

                        {/* Central Pulsating Core */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div
                            className={`w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl ${darkMode ? "shadow-purple-900/50" : "shadow-purple-400/50"}`}
                          >
                            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                              <Users className="w-10 h-10 lg:w-12 lg:h-12 text-purple-600 dark:text-purple-400" />
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Floating Data Points */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className={`absolute top-6 left-6 lg:top-10 lg:left-10 w-32 lg:w-40 p-4 rounded-2xl backdrop-blur-sm ${
                        darkMode
                          ? "bg-gray-800/80 border-gray-700"
                          : "bg-white/90 border-gray-200"
                      } border shadow-xl`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                            98% Success Rate
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                            Student Satisfaction
                          </p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 1, duration: 2 }}
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className={`absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-32 lg:w-40 p-4 rounded-2xl backdrop-blur-sm ${
                        darkMode
                          ? "bg-gray-800/80 border-gray-700"
                          : "bg-white/90 border-gray-200"
                      } border shadow-xl`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm lg:text-base font-bold text-gray-900 dark:text-white">
                            24/7 Support
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                            Always Available
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Connecting Lines Animation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <motion.path
                        d="M80,80 Q200,40 320,80"
                        stroke={
                          darkMode
                            ? "rgba(59, 130, 246, 0.3)"
                            : "rgba(59, 130, 246, 0.2)"
                        }
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.path
                        d="M320,240 Q200,280 80,240"
                        stroke={
                          darkMode
                            ? "rgba(168, 85, 247, 0.3)"
                            : "rgba(168, 85, 247, 0.2)"
                        }
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      />
                    </svg>

                    {/* Floating Particles */}
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 lg:w-2 lg:h-2 rounded-full ${
                          darkMode ? "bg-blue-400/30" : "bg-blue-400/20"
                        }`}
                        initial={{
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                          opacity: 0,
                        }}
                        animate={{
                          x: Math.random() * 400 - 200,
                          y: Math.random() * 400 - 200,
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: Math.random() * 10 + 10,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Gradient Blobs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${
              darkMode ? "bg-blue-900" : "bg-blue-200"
            }`}
          />

          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              delay: 5,
            }}
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 ${
              darkMode ? "bg-purple-900" : "bg-purple-200"
            }`}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2" />
            </div>
          </div>
        </motion.div>
      </section>

      <section
        className={`py-24 ${
          darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
        } transition-colors duration-300`}
      >
        <div className="container mx-auto px-6">
          {/* Header Section - Clean Premium */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Simple Premium Badge */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500  from-blue-500 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-800 dark:text-blue-900" />
                  <span className="text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent text-white">
                    Why Choose Us
                  </span>
                </span>
              </div>

              {/* Clean Heading */}
              <h2 className="text-4xl text-black  md:text-5xl font-bold tracking-tight">
                <span className="text-black ">The Four Pillars of</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-600">
                  Student Success
                </span>
              </h2>

              {/* Clean Description */}
              <p
                className={`max-w-3xl mx-auto text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Navigating the admission process alone can be overwhelming.
                <span className="block mt-2 font-medium text-black dark:text-black">
                  We provide the expertise, network, and personalized care to
                  secure your academic future.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Pillars Grid - Clean Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group"
              >
                {/* Clean Card - No excessive effects */}
                <div
                  className={`relative h-full rounded-2xl p-6 transition-all duration-300 
        ${
          darkMode
            ? "bg-gray-900/80 border border-gray-800 hover:border-gray-700"
            : "bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
        }`}
                >
                  {/* Simple Icon Container - Clean gradient */}
                  <div className="mb-5">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br 
            ${
              pillar.color === "blue"
                ? "from-blue-500 to-blue-600"
                : pillar.color === "indigo"
                  ? "from-indigo-500 to-indigo-600"
                  : pillar.color === "cyan"
                    ? "from-cyan-500 to-cyan-600"
                    : "from-purple-500 to-purple-600"
            } flex items-center justify-center text-white shadow-md`}
                    >
                      <div className="w-6 h-6">{pillar.icon}</div>
                    </div>
                  </div>

                  {/* Content - Clean typography */}
                  <div className="space-y-3">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider
            ${
              pillar.color === "blue"
                ? "text-blue-600 dark:text-blue-400"
                : pillar.color === "indigo"
                  ? "text-indigo-600 dark:text-indigo-400"
                  : pillar.color === "cyan"
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-purple-600 dark:text-purple-400"
            }`}
                    >
                      {pillar.subtitle}
                    </span>

                    <h3
                      className={`text-xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {pillar.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {pillar.description}
                    </p>

                    {/* Simple Checkmark Points - Clean */}
                    <ul className="space-y-2 pt-2">
                      {pillar.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 flex-shrink-0
                  ${
                    pillar.color === "blue"
                      ? "text-blue-500"
                      : pillar.color === "indigo"
                        ? "text-indigo-500"
                        : pillar.color === "cyan"
                          ? "text-cyan-500"
                          : "text-purple-500"
                  }`}
                          />
                          <span
                            className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subtle hover arrow - Clean */}
                  <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight
                      className={`w-4 h-4 
            ${
              pillar.color === "blue"
                ? "text-blue-500"
                : pillar.color === "indigo"
                  ? "text-indigo-500"
                  : pillar.color === "cyan"
                    ? "text-cyan-500"
                    : "text-purple-500"
            }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 ${
          darkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-blue-50 to-purple-50"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "15K+",
                label: "Students Admitted",
                icon: <Users className="w-8 h-8" />,
              },
              {
                value: "9+",
                label: "Years Experience",
                icon: <Award className="w-8 h-8" />,
              },
              {
                value: "500+",
                label: "Partner Colleges",
                icon: <School className="w-8 h-8" />,
              },
              {
                value: "100%",
                label: "Guidance Support",
                icon: <Headphones className="w-8 h-8" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Focus Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-56 rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                    alt="Counselor"
                  />
                </motion.div>
                <div className="h-40 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-6 text-white shadow-xl">
                  <div className="text-center">
                    <p className="text-3xl font-bold mb-2">15+</p>
                    <p className="text-sm font-medium">Certified Specialists</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-40 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center p-6 text-white shadow-xl">
                  <Users className="w-12 h-12 text-blue-400" />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-56 rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                    alt="Counseling"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold mb-4 block">
              Our Unique Approach
            </span>
            <h2 className="text-3xl font-bold mb-6">
              Collective Wisdom for Individual Growth
            </h2>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Unlike solo practitioners, we work as an integrated team. If your
              career stress is affecting your relationship, our career expert
              and relationship counselor collaborate to provide a unified
              solution.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Multi-Perspective Analysis",
                  desc: "Every case is reviewed by at least two specialists to ensure objective guidance.",
                },
                {
                  title: "Evidence-Based Frameworks",
                  desc: "We utilize CBT, Gottman Method, and Data-Driven Career Mapping.",
                },
                {
                  title: "Global Accessibility",
                  desc: "Secure tele-health options for clients across all time zones.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-blue-500 transition-colors "
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className={darkMode ? "text-gray-400" : "text-black"}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Hear from those who transformed their lives with our guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={i}
                testimonial={testimonial}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        className={`py-16 ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-blue-900 to-purple-900"
        } text-white`}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-blue-300 font-semibold mb-2 block">
              Simple & Effective
            </span>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-blue-200">
              Simplifying the path to your better self.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "A free 15-minute call to understand your needs.",
                icon: <MessageCircle className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Matching",
                desc: "We pair you with the perfect specialist team.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Insight",
                desc: "Deep-dive sessions to uncover core challenges.",
                icon: <Brain className="w-6 h-6" />,
              },
              {
                step: "04",
                title: "Evolution",
                desc: "Actionable plans and ongoing mentorship.",
                icon: <Sparkles className="w-6 h-6" />,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-center hover:bg-white/15 transition-all"
              >
                <div className="text-4xl font-bold text-blue-300 mb-4">
                  {step.step}
                </div>
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-bold mb-2 text-lg">{step.title}</h3>
                <p className="text-blue-200 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Everything you need to know before getting started
          </p>
        </div>

        <div
          className={`rounded-2xl p-6 shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} darkMode={darkMode} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold">Your Privacy Matters</h4>
            </div>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              All sessions are encrypted end-to-end and comply with
              international privacy regulations. We never share your data with
              third parties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your transformation?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands who have already reclaimed their peace, purpose,
              and potential with CounselHub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free initial consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
