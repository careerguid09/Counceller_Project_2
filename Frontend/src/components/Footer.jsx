import { FaFacebook, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Phone,
  MapPin,
  ArrowRight,
  GraduationCap,
  Mail,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/course-pages-dashboard" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "College Selection",
    "Admission Strategy",
    "Career Roadmap",
    "Interview Preparation",
    "Scholarship Guidance",
    "Document Review",
    "Test Preparation",
    "Visa Assistance",
  ];

  const socialLinks = [
    {
      label: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600",
      url: "https://www.instagram.com/ss_admission_wala?igsh=YW1meXhmY2RxdjRv",
    },
    {
      label: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      color: "hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700",
      url: "https://www.youtube.com/@SSADMISSIONVALA",
    },
    {
      label: "Facebook",
      icon: <FaFacebook className="w-5 h-5" />,
      color: "hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800",
      url: "https://www.facebook.com/profile.php?id=61587254466624",
    },
    {
      label: "WhatsApp",
      icon: <Phone className="w-5 h-5" />,
      color: "hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600",
      url: "https://wa.me/917415666361",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-50"
                />
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-xl text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">SS ADMISSION VALA</h2>
                <p className="text-sm text-gray-400">
                  Premium Admission Consultants
                </p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming student aspirations into global opportunities through
              expert guidance and personalized counseling since 2012.
            </p>

            {/* Social Links Section */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center 
                    text-gray-300 bg-gray-800/50 backdrop-blur-sm
                    border border-gray-700
                    transition-all duration-300
                    ${social.color}
                    hover:text-white hover:border-transparent
                    hover:shadow-lg
                  `}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} className="group">
                  <a
                    href={link.path}
                    className="flex items-center text-gray-400 hover:text-white transition-colors group-hover:text-blue-400"
                  >
                    <ArrowRight className="mr-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }} className="group">
                  <div className="flex items-center text-gray-400 hover:text-white transition-colors group-hover:text-blue-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-400 mt-1 flex-shrink-0 w-5 h-5" />
                <span className="text-gray-400">
                  <a
                    href="https://maps.app.goo.gl/XnW6DUaLRCxb1ymbA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Arhedi Road, Shiv City, Ayodhya Nagar Bhopal
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-400 flex-shrink-0 w-5 h-5" />
                <a
                  href="tel:+917415666361"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +91 74156 66361
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-400 flex-shrink-0 w-5 h-5" />
                <a
                  href="mailto:careerguid09@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  careerguid09@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "15000+", label: "Students Guided" },
              { number: "98%", label: "Success Rate" },
              { number: "500+", label: "Partner Colleges" },
              { number: "₹25Cr+", label: "Scholarships Secured" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SS Admission Vala. All rights
              reserved.
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>for students</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
