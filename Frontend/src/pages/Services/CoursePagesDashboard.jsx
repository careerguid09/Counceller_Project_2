import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBook,
  FaSearch,
  FaFilter,
  FaStethoscope,
  FaPills,
  FaUserNurse,
  FaMicroscope,
  FaCogs,
  FaBriefcase,
  FaUniversity,
  FaLanguage,
  FaSeedling,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa";

const CoursePagesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Course Categories Data
  const courseCategories = [
    {
      id: 1,
      title: "MEDICAL",
      icon: <FaStethoscope />,
      description: "Medical degree programs and courses",
      totalCourses: 4,
      color: "red",
    },
    {
      id: 2,
      title: "PHARMACY",
      icon: <FaPills />,
      description: "Pharmacy and pharmaceutical sciences",
      totalCourses: 5,
      color: "green",
    },
    {
      id: 3,
      title: "NURSING",
      icon: <FaUserNurse />,
      description: "Nursing and healthcare programs",
      totalCourses: 5,
      color: "blue",
    },
    {
      id: 4,
      title: "PARAMEDICAL",
      icon: <FaMicroscope />,
      description: "Paramedical and allied health services",
      totalCourses: 4,
      color: "purple",
    },
    {
      id: 5,
      title: "ENGINEERING",
      icon: <FaCogs />,
      description: "Engineering and technology programs",
      totalCourses: 4,
      color: "orange",
    },
    {
      id: 6,
      title: "MANAGEMENT",
      icon: <FaBriefcase />,
      description: "Business and management studies",
      totalCourses: 3,
      color: "indigo",
    },
    {
      id: 7,
      title: "GRADUATION",
      icon: <FaUniversity />,
      description: "Undergraduate degree programs",
      totalCourses: 3,
      color: "teal",
    },
    {
      id: 8,
      title: "POST GRADUATION",
      icon: <FaGraduationCap />,
      description: "Postgraduate master programs",
      totalCourses: 3,
      color: "cyan",
    },
    {
      id: 9,
      title: "VOCATIONAL COURSES",
      icon: <FaLaptopCode />,
      description: "Vocational and skill-based courses",
      totalCourses: 4,
      color: "pink",
    },
    {
      id: 10,
      title: "LANGUAGE COURSES",
      icon: <FaLanguage />,
      description: "Foreign language programs",
      totalCourses: 4,
      color: "yellow",
    },
    {
      id: 11,
      title: "AGRICULTURE",
      icon: <FaSeedling />,
      description: "Agricultural science programs",
      totalCourses: 2,
      color: "lime",
    },
    {
      id: 12,
      title: "EDUCATION COURSES",
      icon: <FaChalkboardTeacher />,
      description: "Teaching and education programs",
      totalCourses: 3,
      color: "amber",
    },
  ];

  // COMPLETE Course Details for ALL categories
  const courseDetails = {
    MEDICAL: [
      {
        name: "MBBS",
        duration: "5.5 Years",
        eligibility: "12th PCB",
        seats: 150,
      },
      {
        name: "BAMS",
        duration: "5.5 Years",
        eligibility: "12th PCB",
        seats: 100,
      },
      {
        name: "BHMS",
        duration: "5.5 Years",
        eligibility: "12th PCB",
        seats: 80,
      },
      {
        name: "BNYS",
        duration: "5.5 Years",
        eligibility: "12th PCB",
        seats: 60,
      },
    ],
    PHARMACY: [
      {
        name: "B.Pharma",
        duration: "4 Years",
        eligibility: "12th PCB",
        seats: 120,
      },
      {
        name: "D.Pharma",
        duration: "2 Years",
        eligibility: "12th PCB",
        seats: 100,
      },
      {
        name: "M.Pharma",
        duration: "2 Years",
        eligibility: "B.Pharma",
        seats: 60,
      },
      {
        name: "Pharm D",
        duration: "6 Years",
        eligibility: "12th PCB",
        seats: 50,
      },
      {
        name: "PhD Pharmacy",
        duration: "3-5 Years",
        eligibility: "M.Pharma",
        seats: 20,
      },
    ],
    NURSING: [
      { name: "ANM", duration: "2 Years", eligibility: "12th Any", seats: 100 },
      {
        name: "GNM",
        duration: "3.5 Years",
        eligibility: "12th Any",
        seats: 120,
      },
      {
        name: "BSc Nursing",
        duration: "4 Years",
        eligibility: "12th PCB",
        seats: 80,
      },
      {
        name: "MSc Nursing",
        duration: "2 Years",
        eligibility: "BSc Nursing",
        seats: 40,
      },
      {
        name: "Post Basic Nursing",
        duration: "2 Years",
        eligibility: "GNM",
        seats: 60,
      },
    ],
    PARAMEDICAL: [
      {
        name: "X-Ray Technician (Radiology)",
        duration: "2 Years",
        eligibility: "12th PCB",
        seats: 80,
      },
      {
        name: "BMLT / DMLT",
        duration: "2-3 Years",
        eligibility: "12th PCB",
        seats: 100,
      },
      {
        name: "BPT / MPT",
        duration: "4.5 Years",
        eligibility: "12th PCB",
        seats: 60,
      },
      {
        name: "Bachelor of Human Nutrition",
        duration: "3 Years",
        eligibility: "12th PCB",
        seats: 50,
      },
    ],
    ENGINEERING: [
      {
        name: "Diploma Engineering",
        duration: "3 Years",
        eligibility: "10th Pass",
        seats: 200,
      },
      {
        name: "B.Tech / BE",
        duration: "4 Years",
        eligibility: "12th PCM",
        seats: 180,
      },
      {
        name: "M.Tech / ME",
        duration: "2 Years",
        eligibility: "B.Tech",
        seats: 80,
      },
      {
        name: "PhD Engineering",
        duration: "3-5 Years",
        eligibility: "M.Tech",
        seats: 30,
      },
    ],
    MANAGEMENT: [
      { name: "BBA", duration: "3 Years", eligibility: "12th Any", seats: 150 },
      {
        name: "MBA",
        duration: "2 Years",
        eligibility: "Graduation",
        seats: 120,
      },
      {
        name: "PGDM",
        duration: "2 Years",
        eligibility: "Graduation",
        seats: 100,
      },
    ],
    GRADUATION: [
      { name: "BA", duration: "3 Years", eligibility: "12th Arts", seats: 200 },
      {
        name: "BSc",
        duration: "3 Years",
        eligibility: "12th Science",
        seats: 180,
      },
      {
        name: "BCom",
        duration: "3 Years",
        eligibility: "12th Commerce",
        seats: 160,
      },
    ],
    "POST GRADUATION": [
      { name: "MA", duration: "2 Years", eligibility: "BA", seats: 100 },
      { name: "MSc", duration: "2 Years", eligibility: "BSc", seats: 90 },
      { name: "MCom", duration: "2 Years", eligibility: "BCom", seats: 80 },
    ],
    "VOCATIONAL COURSES": [
      { name: "BCA", duration: "3 Years", eligibility: "12th Any", seats: 120 },
      {
        name: "MCA",
        duration: "3 Years",
        eligibility: "Graduation",
        seats: 100,
      },
      {
        name: "PGDCA",
        duration: "1 Year",
        eligibility: "Graduation",
        seats: 80,
      },
      {
        name: "B.Lib / M.Lib",
        duration: "1-2 Years",
        eligibility: "Graduation",
        seats: 60,
      },
    ],
    "LANGUAGE COURSES": [
      {
        name: "German (Bachelor)",
        duration: "3 Years",
        eligibility: "12th Any",
        seats: 80,
      },
      {
        name: "French (Diploma)",
        duration: "1 Year",
        eligibility: "12th Any",
        seats: 70,
      },
      {
        name: "Italian (Certificate)",
        duration: "6 Months",
        eligibility: "12th Any",
        seats: 60,
      },
      {
        name: "Chinese (Bachelor & Diploma)",
        duration: "1-3 Years",
        eligibility: "12th Any",
        seats: 50,
      },
    ],
    AGRICULTURE: [
      {
        name: "BSc Agriculture",
        duration: "4 Years",
        eligibility: "12th PCB",
        seats: 100,
      },
      {
        name: "MSc Agriculture",
        duration: "2 Years",
        eligibility: "BSc Agriculture",
        seats: 60,
      },
    ],
    "EDUCATION COURSES": [
      {
        name: "B.Ed",
        duration: "2 Years",
        eligibility: "Graduation",
        seats: 120,
      },
      {
        name: "D.El.Ed",
        duration: "2 Years",
        eligibility: "12th Pass",
        seats: 150,
      },
      {
        name: "CTET / STET Guidance",
        duration: "6 Months",
        eligibility: "B.Ed",
        seats: 200,
      },
    ],
  };

  // Filter categories based on search
  const filteredCategories = courseCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get color classes based on color name
  const getColorClasses = (color) => {
    const colorMap = {
      red: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-600",
        hover: "hover:bg-red-100",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-600",
        hover: "hover:bg-green-100",
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        hover: "hover:bg-blue-100",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600",
        hover: "hover:bg-purple-100",
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-600",
        hover: "hover:bg-orange-100",
      },
      indigo: {
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        text: "text-indigo-600",
        hover: "hover:bg-indigo-100",
      },
      teal: {
        bg: "bg-teal-50",
        border: "border-teal-200",
        text: "text-teal-600",
        hover: "hover:bg-teal-100",
      },
      cyan: {
        bg: "bg-cyan-50",
        border: "border-cyan-200",
        text: "text-cyan-600",
        hover: "hover:bg-cyan-100",
      },
      pink: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        text: "text-pink-600",
        hover: "hover:bg-pink-100",
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-600",
        hover: "hover:bg-yellow-100",
      },
      lime: {
        bg: "bg-lime-50",
        border: "border-lime-200",
        text: "text-lime-600",
        hover: "hover:bg-lime-100",
      },
      amber: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-600",
        hover: "hover:bg-amber-100",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  // Close details panel
  const handleCloseDetails = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Course Categories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse all course categories. Click on any category to view detailed
            course information.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => {
            const colors = getColorClasses(category.color);

            return (
              <div
                key={category.id}
                className={`bg-white rounded-2xl shadow-lg border ${colors.border} overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${selectedCategory?.id === category.id ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="p-6">
                  {/* Category Icon */}
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <div className={`text-2xl ${colors.text}`}>
                      {category.icon}
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Course Count */}
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm font-medium text-gray-500">
                      {category.totalCourses} courses
                    </span>
                    <div
                      className={`flex items-center gap-2 ${colors.text} font-medium`}
                    >
                      <span className="text-sm">View Details</span>
                      <FaArrowRight className="text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Category Details Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${getColorClasses(selectedCategory.color).bg} rounded-xl flex items-center justify-center`}
                    >
                      <div
                        className={`text-xl ${getColorClasses(selectedCategory.color).text}`}
                      >
                        {selectedCategory.icon}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedCategory.title}
                      </h2>
                      <p className="text-gray-600">
                        {selectedCategory.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseDetails}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Available Courses
                  </h3>

                  {/* Courses Table - NOW ALL CATEGORIES WILL SHOW DATA */}
                  <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Eligibility
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seats
                          </th>
                     
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {(courseDetails[selectedCategory.title] || []).map(
                          (course, index) => (
                            <tr
                              key={index}
                              className="hover:bg-white transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">
                                  {course.name}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-700">
                                  {course.duration}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-gray-700">
                                  {course.eligibility}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {course.seats} seats
                                </span>
                              </td>
                           
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Show message only if really no data */}
                  {(!courseDetails[selectedCategory.title] ||
                    courseDetails[selectedCategory.title].length === 0) && (
                    <div className="text-center py-8">
                      <FaBook className="text-gray-400 text-3xl mx-auto mb-3" />
                      <p className="text-gray-600">
                        Course details coming soon...
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Need help choosing?
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Our career counselors can help you select the right course
                    based on your interests and career goals.
                  </p>
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                     <a href="/contact"> Book Free Counseling Session</a>
            
                  </button>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {courseDetails[selectedCategory.title]?.length || 0}{" "}
                    courses
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseDetails}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow border border-gray-200">
            <span className="text-gray-600">Total Categories:</span>
            <span className="font-bold text-blue-600 text-lg">
              {courseCategories.length}
            </span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-600">Total Courses:</span>
            <span className="font-bold text-green-600 text-lg">
              {courseCategories.reduce(
                (total, cat) => total + cat.totalCourses,
                0,
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePagesDashboard;
