import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  User,
  MessageCircle,
  Shield,
  Globe,
  Search,
  ChevronDown,
  Check,
  AlertCircle,
  Info,
  X,
  Loader2,
  Facebook,
  Instagram,
  Youtube,
  MessageSquare,
  ExternalLink,
  GraduationCap,
  Calendar,
  Clock,
  PhoneCall,
  Map as MapIcon,
  BookOpen,
  Users,
} from "lucide-react";
import countries from "world-countries";


const countriesData = countries
  .map((c) => ({
    name: c.name.common,
    code: `${c.idd.root || ""}${c.idd.suffixes?.[0] || ""}`,
    flag: c.flag,
  }))
  .filter(c => c.code && c.code !== "undefined")
  .sort((a, b) => a.name.localeCompare(b.name));




// --- SEARCHABLE SELECT COMPONENT ---
const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  disabled,
  isPhoneSelector,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const searchStr =
        typeof opt === "string" ? opt : `${opt.name} ${opt.code}`;
      return searchStr.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (isPhoneSelector) {
      const found = countriesData.find((c) => c.code === value);
      return found ? `${found.code}` : value;
    }
    return value;
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${disabled
            ? "bg-gray-50 border-gray-100 opacity-50"
            : "bg-white border-gray-200 hover:border-blue-500"
          } ${isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className="font-medium">{getDisplayValue()}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden left-0"
          >
            <div className="p-2 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                className="w-full text-sm outline-none py-1"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isString = typeof opt === "string";
                  const labelStr = isString
                    ? opt
                    : `${opt.name} (${opt.code})`;
                  const valStr = isString ? opt : opt.code;

                  return (
                    <div
                      key={isString ? opt : opt.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(valStr);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <span className="truncate">{labelStr}</span>
                      {(isString ? value === opt : value === opt.code) && (
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-gray-400 italic text-center">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type = "success", onClose, progress = 100 }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <X className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    loading: <Loader2 className="w-5 h-5 animate-spin" />,
  };

  const colors = {
    success: "bg-green-500 border-green-600",
    error: "bg-red-500 border-red-600",
    warning: "bg-amber-500 border-amber-600",
    info: "bg-blue-500 border-blue-600",
    loading: "bg-gray-700 border-gray-800",
  };

  const title = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
    loading: "Loading...",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`relative overflow-hidden rounded-lg shadow-lg ${colors[type]} border`}
    >
      <div className="px-4 py-3 flex items-start gap-3 text-white">
        <div className="flex-shrink-0">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">{title[type]}</div>
          <div className="text-sm">{message}</div>
        </div>
        {type !== "loading" && (
          <button
            onClick={onClose}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const domainData = {
    MEDICAL: ["MBBS", "BAMS", "BHMS", "BNYS"],
    PHARMACY: ["B.Pharma", "D.Pharma", "M.Pharma", "Pharm D"],
    NURSING: ["ANM", "GNM", "BSc Nursing", "MSc Nursing"],
    PARAMEDICAL: ["BMLT", "DMLT", "BPT", "MPT"],
    ENGINEERING: ["B.Tech", "M.Tech", "Diploma", "PhD"],
    MANAGEMENT: ["BBA", "MBA", "PGDM"],
  };

  const eduLevels = [
    "High School (10th)",
    "Intermediate (12th)",
    "Diploma Holder",
    "Graduate",
    "Postgraduate",
    "PhD / Doctorate",
  ];

  const contactInfo = {
    phone: "+91 74156 66361",
    whatsapp: "+917415666361",
    email: "careerguid09@gmail.com",
    address: "Arhedi Road, Shiv City, Ayodhya Nagar, Bhopal",
    googleMaps: "https://maps.app.goo.gl/XnW6DUaLRCxb1ymbA",
    instagram: "https://www.instagram.com/ss_admission_wala",
    facebook: "https://www.facebook.com/profile.php?id=61587254466624",
    youtube: "https://www.youtube.com/@SSADMISSIONVALA"
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    dob: "",
    age: "",
    country: "",
    state: "",
    city: "",
    eduLevel: "",
    domain: "",
    course: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const toast = {
    success: (message, duration = 4000) =>
      addToast(message, "success", duration),
    error: (message, duration = 4000) => addToast(message, "error", duration),
    warning: (message, duration = 4000) =>
      addToast(message, "warning", duration),
    info: (message, duration = 4000) => addToast(message, "info", duration),
    loading: (message) => addToast(message, "loading", 0),
    dismiss: (id) => removeToast(id),
  };

  const addToast = (message, type = "success", duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, progress: 100 };
    setToasts((prev) => [...prev, newToast]);

    if (type !== "loading" && duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 0 ? age : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "dob") {
      updatedData.age = calculateAge(value);
    }

    setFormData(updatedData);
  };

  const handleCountryChange = (val) => {
    const selected = countriesData.find((c) => c.name === val);
    setFormData({
      ...formData,
      country: val,
      countryCode: selected ? selected.code : formData.countryCode,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 8) {
      toast.error("Please enter a valid phone number (minimum 8 digits).");
      return;
    }

    if (!formData.eduLevel || !formData.domain || !formData.course) {
      toast.warning("Please fill all required academic fields.");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Submitting your form...");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.countryCode} ${formData.phone}`,
        }),
      });

      toast.dismiss(loadingToastId);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        countryCode: "+91",
        phone: "",
        dob: "",
        age: "",
        country: "",
        state: "",
        city: "",
        eduLevel: "",
        domain: "",
        course: "",
        message: "",
      });

      toast.success("Form submitted successfully! Our team will contact you soon.");

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Form submit error:", error);
      toast.error(
        error.message || "Submission failed. Please try again later.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Hello SS Admission Wala, I'm interested in career counseling.`;
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-80">
        <AnimatePresence>
          {toasts.map((toastItem) => (
            <Toast
              key={toastItem.id}
              message={toastItem.message}
              type={toastItem.type}
              onClose={() => removeToast(toastItem.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Floating WhatsApp Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={openWhatsApp}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-green-500/50 transition-all"
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </motion.button>



        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Left Sidebar - Contact Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>

                  <div className="space-y-4">
                    {/* Phone */}
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <PhoneCall className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <button
                      onClick={openWhatsApp}
                      className="w-full flex gap-4 p-3 rounded-lg hover:bg-green-50 transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">WhatsApp</p>
                        <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
                        <span className="text-xs text-green-600 mt-1 inline-flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Online Now
                        </span>
                      </div>
                    </button>

                    {/* Email */}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex gap-4 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900 truncate">{contactInfo.email}</p>
                      </div>
                    </a>

                    {/* Address */}
                    <a
                      href={contactInfo.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-3 rounded-lg hover:bg-orange-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <MapIcon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Office Address</p>
                        <p className="font-semibold text-gray-900">{contactInfo.address}</p>
                        <div className="flex items-center gap-1 mt-1 text-blue-600 text-sm">
                          <ExternalLink className="w-3 h-3" />
                          <span>View on Maps</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-500 mb-3">Follow Us</p>
                    <div className="flex gap-2">
                      <a
                        href={contactInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-2 rounded-lg bg-gray-100 hover:bg-pink-100 transition-colors text-gray-700 hover:text-pink-600 flex items-center justify-center"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href={contactInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors text-gray-700 hover:text-blue-600 flex items-center justify-center"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                      <a
                        href={contactInfo.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition-colors text-gray-700 hover:text-red-600 flex items-center justify-center"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-blue-600 rounded-xl p-6 text-white"
                >
                  <h3 className="text-lg font-bold mb-4">Our Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90">Students Guided</div>
                          <div className="text-xl font-bold">15,000+</div>
                        </div>
                      </div>  
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-blue-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90">Success Rate</div>
                          <div className="text-xl font-bold">98%</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm opacity-90">Expert Counselors</div>
                          <div className="text-xl font-bold">15+</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  {/* Form Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Free Career Consultation Request
                        </h2>
                        <p className="text-gray-600">
                          Fill the form below to get personalized guidance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-green-900">Request Submitted Successfully!</h4>
                            <p className="text-green-700 text-sm mt-1">
                              Our counselor will contact you within 24 hours.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Personal Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="fullName"
                              required
                              value={formData.fullName}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <div className="w-full sm:w-40">
                              <SearchableSelect
                                isPhoneSelector
                                options={countriesData}
                                value={formData.countryCode}
                                onChange={(val) =>
                                  setFormData({ ...formData, countryCode: val })
                                }
                                placeholder="Code"
                              />
                            </div>
                            <div className="flex-1 relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, "");
                                  setFormData({ ...formData, phone: val });
                                }}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter phone number"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Date of Birth & Age */}
                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="date"
                                name="dob"
                                required
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Age
                            </label>
                            <input
                              type="text"
                              name="age"
                              readOnly
                              value={formData.age}
                              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                              placeholder="Auto-calculated"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Location */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Country */}
                        <SearchableSelect
                          label="Country"
                          options={countriesData.map((c) => c.name)}
                          value={formData.country}
                          placeholder="Select country"
                          icon={Globe}
                          onChange={handleCountryChange}
                        />

                        {/* State */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            State / Province
                          </label>
                          <div className="relative">
                            <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter state"
                            />
                          </div>
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            City / Town
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              placeholder="Enter city"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Academic Goals */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Education Level */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Current Education Level <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="eduLevel"
                            value={formData.eduLevel}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="">Select your level</option>
                            {eduLevels.map((e) => (
                              <option key={e} value={e}>
                                {e}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Domain */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Interested Domain <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="domain"
                            required
                            value={formData.domain}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="">Select domain</option>
                            {Object.keys(domainData).map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Course Selection */}
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Interested Course <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="hidden"
                            name="course"
                            value={formData.course}
                            required
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {!formData.domain ? (
                              <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                                <p className="text-gray-500">
                                  Select a domain to view available courses
                                </p>
                              </div>
                            ) : (
                              domainData[formData.domain].map((course) => (
                                <button
                                  type="button"
                                  key={course}
                                  onClick={() =>
                                    setFormData({ ...formData, course })
                                  }
                                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${formData.course === course
                                      ? "bg-blue-600 border-blue-600 text-white"
                                      : "bg-white border-gray-300 text-gray-700 hover:border-blue-500"
                                    }`}
                                >
                                  {course}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Additional Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Any specific requirements or questions..."
                      />
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span>Secure & Confidential</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>24-hour response</span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={
                          isLoading ||
                          !formData.eduLevel ||
                          !formData.domain ||
                          !formData.course
                        }
                        className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isLoading ||
                            !formData.eduLevel ||
                            !formData.domain ||
                            !formData.course
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">SS Admission Wala</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Your trusted partner for career guidance and admission counseling since 2012.
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">9+</div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15k+</div>
                  <div className="text-gray-300">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                  <div className="text-gray-300">Partner Colleges</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;