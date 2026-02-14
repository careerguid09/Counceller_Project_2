import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaTachometerAlt,
  FaGraduationCap,
  FaCity,
  FaAngleRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
const CounselorLoginModal = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/counselor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("counselorToken", data.token);

      const counselorProfile = {
        email: formData.email,
        role: "counselor",
        name: data.counselor?.name || formData.email.split("@")[0],
      };

       toast.success("Login successfully!");

      onLogin(counselorProfile);
      onClose();
      navigate("/counselors/dashboard");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Counselor Login</h2>
              <p className="text-gray-600 mt-1">Access your counselor dashboard</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="counselor@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login as Counselor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCounselorLoggedIn, setIsCounselorLoggedIn] = useState(false);
  const [counselorProfile, setCounselorProfile] = useState(null);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showMobileServices, setShowMobileServices] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Services options
  const servicesOptions = [
    {
      name: "Course Pages",
      path: "/course-pages-dashboard",
      icon: <FaGraduationCap className="text-blue-500" />,
      description: "Explore all courses"
    },
    {
      name: "City Target",
      path: "/city-target-dashboard", 
      icon: <FaCity className="text-purple-500" />,
      description: "Second City Target Programs"
    }
  ];

  // Check if counselor is already logged in
  useEffect(() => {
    const savedCounselor = localStorage.getItem("counselorProfile");
    const token = localStorage.getItem("counselorToken");
    
    if (savedCounselor && token) {
      setCounselorProfile(JSON.parse(savedCounselor));
      setIsCounselorLoggedIn(true);
    }
  }, []);

  // Detect scroll for navbar background effect with throttle
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Use 10px threshold for smoother transition
          const shouldScrolled = currentScrollY > 10;
          
          if (shouldScrolled !== scrolled) {
            setScrolled(shouldScrolled);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowMobileServices(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        servicesButtonRef.current && 
        !servicesButtonRef.current.contains(event.target)
      ) {
        setShowServicesDropdown(false);
      }
    };

    if (showServicesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showServicesDropdown]);

  // Handle counselor login
  const handleCounselorLogin = (profile) => {
    setCounselorProfile(profile);
    setIsCounselorLoggedIn(true);
    localStorage.setItem("counselorProfile", JSON.stringify(profile));
    navigate("/counselors/dashboard");
  };

  // Handle counselor logout
  const handleCounselorLogout = async () => {
    try {
      const token = localStorage.getItem("counselorToken");

      if (token) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/counselor/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Logout successfully!");
      }
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("counselorToken");
      localStorage.removeItem("counselorProfile");
      setIsCounselorLoggedIn(false);
      setCounselorProfile(null);
      navigate("/");
    }
  };

  // Handle For Counselors click
  const handleForCounselorsClick = (e) => {
    e.preventDefault();
    
    if (!isCounselorLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate("/counselors/dashboard");
    }
  };

  // Mouse events for desktop dropdown
  const handleMouseEnter = () => {
    setShowServicesDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover') && !servicesButtonRef.current?.matches(':hover')) {
        setShowServicesDropdown(false);
      }
    }, 100);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transform-gpu ${
          scrolled
            ? "bg-white shadow-lg py-2 border-b border-gray-200"
            : "bg-white py-4"
        }`}
        style={{
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <FaUserGraduate className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900"> SS ADMISSION VALA</h1>
                  <p className="text-xs text-gray-500 font-medium">Expert Admissions Counseling</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className={`px-5 py-2.5 font-medium rounded-lg hover:text-blue-600 transition-colors ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}

              {/* Services Dropdown */}
              <div 
                className="relative"
                ref={servicesButtonRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center px-5 py-2.5 font-medium rounded-lg transition-colors ${
                    showServicesDropdown ||
                    location.pathname === "/course-pages-dashboard" || 
                    location.pathname === "/city-target-dashboard"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                >
                  <span className="mr-2">Services</span>
                  <FaChevronDown className={`text-xs transition-transform ${showServicesDropdown ? "rotate-180" : ""}`} />
                </button>

                {showServicesDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    style={{ transform: 'translateZ(0)' }}
                    onMouseEnter={() => setShowServicesDropdown(true)}
                    onMouseLeave={() => setShowServicesDropdown(false)}
                  >
                    <div className="py-2">
                      {servicesOptions.map((option) => (
                        <Link
                          key={option.name}
                          to={option.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group border-b border-gray-100 last:border-b-0"
                          onClick={() => setShowServicesDropdown(false)}
                        >
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                            {option.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 group-hover:text-blue-600">{option.name}</p>
                            <p className="text-xs text-gray-500 group-hover:text-blue-500">{option.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* For Counselors Button */}
              <div className="ml-2">
                {isCounselorLoggedIn ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("/counselors/dashboard")}
                      className="flex items-center px-5 py-2.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-medium rounded-lg hover:from-purple-100 hover:to-purple-200 border border-purple-200 transition-all"
                    >
                      <FaTachometerAlt className="mr-2" />
                      Dashboard
                    </button>

                    <button
                      onClick={handleCounselorLogout}
                      className="flex items-center px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleForCounselorsClick}
                    className="flex items-center px-5 py-2.5 bg-gray-50 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    <FaChalkboardTeacher className="mr-2" />
                    <span>For Counselors</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className="text-gray-700 text-lg" />
              ) : (
                <FaBars className="text-gray-700 text-lg" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-white shadow-lg rounded-lg mt-3 border border-gray-100">
              <div className="py-3">
                {/* Main Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center px-5 py-3.5 mx-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50/50 font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex-1">{link.name}</span>
                    <FaAngleRight className="text-gray-400" />
                  </Link>
                ))}

                {/* Mobile Services Section */}
                <div className="mx-2 my-1">
                  <button
                    onClick={() => setShowMobileServices(!showMobileServices)}
                    className={`flex items-center justify-between w-full px-5 py-3.5 rounded-lg hover:bg-gray-50 transition-colors ${
                      showMobileServices || 
                      location.pathname === "/course-pages-dashboard" || 
                      location.pathname === "/city-target-dashboard"
                        ? "text-blue-600 bg-blue-50/50 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">Services</span>
                    </div>
                    <FaChevronDown className={`text-xs transition-transform ${showMobileServices ? "rotate-180" : ""}`} />
                  </button>

                  {showMobileServices && (
                    <div className="ml-6 mt-1 space-y-1">
                      {servicesOptions.map((option) => (
                        <Link
                          key={option.name}
                          to={option.path}
                          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            setShowMobileServices(false);
                          }}
                        >
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{option.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                          </div>
                          <FaAngleRight className="text-gray-400 text-sm" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* For Counselors Mobile */}
                <div className="px-4 mt-4 pt-4 border-t border-gray-100">
                  {isCounselorLoggedIn ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2 bg-purple-50 rounded-lg mb-3">
                        <p className="text-sm text-purple-700 font-medium">Logged in as</p>
                        <p className="text-lg font-bold text-purple-900 truncate">
                          {counselorProfile?.name || "Counselor"}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          navigate("/counselors/dashboard");
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-5 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        <FaTachometerAlt />
                        <span className="flex-1 text-left">Dashboard</span>
                        <FaAngleRight />
                      </button>
                      
                      <button
                        onClick={() => {
                          handleCounselorLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-5 py-3.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span className="flex-1 text-left">Logout</span>
                        <FaAngleRight />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-5 py-3.5 bg-gray-50 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors"
                    >
                      <FaChalkboardTeacher />
                      <span className="flex-1 text-left">For Counselors</span>
                      <FaAngleRight />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

   
      <CounselorLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleCounselorLogin}
      />
    </>
  );
};

export default Navbar;