import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCity, 
  FaSearch, 
  FaMapMarkerAlt, 
  FaArrowRight,
  FaInfoCircle,
} from 'react-icons/fa';

const CityTargetDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // City Programs Data
 const cityPrograms = [ 
  {
    id: 1,
    name: "Delhi NCR Program",
    city: "Delhi",
    description: "Target program for Delhi NCR region",
    participants: 1200,
    target: 1500,
    status: "Active",
    color: "purple",
    startDate: "2024-01-15",
    endDate: "2024-06-30"
  },
  {
    id: 2,
    name: "Mumbai Target Initiative",
    city: "Mumbai",
    description: "Mumbai metropolitan area campaign",
    participants: 950,
    target: 1200,
    status: "Active",
    color: "blue",
    startDate: "2024-02-01",
    endDate: "2024-07-31"
  },
  {
    id: 3,
    name: "Bangalore Tech Hub",
    city: "Bangalore",
    description: "IT and technology focused program",
    participants: 800,
    target: 1000,
    status: "Active",
    color: "green",
    startDate: "2024-01-01",
    endDate: "2024-12-31"
  },
  {
    id: 4,
    name: "Hyderabad Scheme",
    city: "Hyderabad",
    description: "Educational outreach program",
    participants: 650,
    target: 800,
    status: "Active",
    color: "orange",
    startDate: "2024-03-01",
    endDate: "2024-08-31"
  },
  {
    id: 5,
    name: "Chennai Education Project",
    city: "Chennai",
    description: "Higher education initiative",
    participants: 520,
    target: 700,
    status: "Upcoming",
    color: "red",
    startDate: "2024-04-01",
    endDate: "2024-09-30"
  },
  {
    id: 6,
    name: "Pune Skill Campaign",
    city: "Pune",
    description: "Skill development and training",
    participants: 430,
    target: 600,
    status: "Active",
    color: "indigo",
    startDate: "2024-02-15",
    endDate: "2024-07-15"
  },
  {
    id: 7,
    name: "Kolkata Outreach",
    city: "Kolkata",
    description: "Eastern region educational program",
    participants: 380,
    target: 500,
    status: "Planning",
    color: "yellow",
    startDate: "2024-05-01",
    endDate: "2024-10-31"
  },
  {
    id: 8,
    name: "Ahmedabad Initiative",
    city: "Ahmedabad",
    description: "Gujarat region development program",
    participants: 290,
    target: 400,
    status: "Upcoming",
    color: "teal",
    startDate: "2024-06-01",
    endDate: "2024-11-30"
  },

  // 🔥 MP Cities
  {
    id: 9,
    name: "Bhopal Career Drive",
    city: "Bhopal",
    description: "Career guidance and education support",
    participants: 360,
    target: 500,
    status: "Active",
    color: "cyan",
    startDate: "2024-02-10",
    endDate: "2024-08-10"
  },
  {
    id: 10,
    name: "Indore Skill Mission",
    city: "Indore",
    description: "Industry focused skill development program",
    participants: 420,
    target: 600,
    status: "Active",
    color: "lime",
    startDate: "2024-01-20",
    endDate: "2024-07-20"
  },

  // 🔥 UP Cities
  {
    id: 11,
    name: "Lucknow Education Initiative",
    city: "Lucknow",
    description: "State capital education outreach",
    participants: 480,
    target: 650,
    status: "Active",
    color: "pink",
    startDate: "2024-03-05",
    endDate: "2024-09-05"
  },
  {
    id: 12,
    name: "Kanpur Skill Boost",
    city: "Kanpur",
    description: "Skill enhancement for youth",
    participants: 310,
    target: 450,
    status: "Upcoming",
    color: "amber",
    startDate: "2024-04-15",
    endDate: "2024-10-15"
  },
  {
    id: 13,
    name: "Varanasi Knowledge Program",
    city: "Varanasi",
    description: "Education and awareness initiative",
    participants: 270,
    target: 400,
    status: "Planning",
    color: "violet",
    startDate: "2024-05-10",
    endDate: "2024-11-10"
  },
  {
    id: 14,
    name: "Noida Tech Program",
    city: "Noida",
    description: "Technology and startup focused campaign",
    participants: 620,
    target: 800,
    status: "Active",
    color: "sky",
    startDate: "2024-02-05",
    endDate: "2024-08-05"
  },
  {
    id: 15,
    name: "Ghaziabad Growth Initiative",
    city: "Ghaziabad",
    description: "Urban education and training program",
    participants: 340,
    target: 500,
    status: "Upcoming",
    color: "rose",
    startDate: "2024-06-10",
    endDate: "2024-12-10"
  }
];


  // Program Details
  const programDetails = {
    1: {
      objectives: [
        "Increase college admissions by 30%",
        "Provide career counseling to 5000+ students",
        "Establish 10 new counseling centers"
      ],
      achievements: [
        "1500+ students enrolled",
        "85% satisfaction rate",
        "25 partner colleges"
      ],
      timeline: [
        { phase: "Phase 1", date: "Jan-Mar 2024", status: "Completed" },
        { phase: "Phase 2", date: "Apr-Jun 2024", status: "In Progress" },
        { phase: "Phase 3", date: "Jul-Sep 2024", status: "Upcoming" }
      ]
    },
    2: {
      objectives: [
        "Target 1000+ engineering aspirants",
        "Connect with 50+ tech companies",
        "Organize 20 career fairs"
      ],
      achievements: [
        "950+ participants enrolled",
        "72% placement rate",
        "15 industry partnerships"
      ],
      timeline: [
        { phase: "Foundation", date: "Feb-Apr 2024", status: "Completed" },
        { phase: "Development", date: "May-Jul 2024", status: "In Progress" },
        { phase: "Expansion", date: "Aug-Oct 2024", status: "Upcoming" }
      ]
    }
    // Add details for other programs...
  };

  // Filter programs based on search
  const filteredPrograms = cityPrograms.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get color classes based on color name
  const getColorClasses = (color) => {
    const colorMap = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' },
      red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-600' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600' }
    };
    return colorMap[color] || colorMap.purple;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate progress percentage
  const calculateProgress = (participants, target) => {
    return Math.min(Math.round((participants / target) * 100), 100);
  };

  // Close details modal
  const handleCloseDetails = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">City Target Programs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse city-specific educational programs. Click on any program to view detailed information.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs or cities..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPrograms.map((program) => {
            const colors = getColorClasses(program.color);
            const progress = calculateProgress(program.participants, program.target);
            
            return (
              <div 
                key={program.id}
                className={`bg-white rounded-2xl shadow-lg border ${colors.border} overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${selectedProgram?.id === program.id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedProgram(program)}
              >
                <div className="p-6">
                  {/* City Icon and Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <FaMapMarkerAlt className={`text-xl ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{program.city}</h3>
                      <p className="text-sm text-gray-600">City Program</p>
                    </div>
                  </div>
                  
                  {/* Program Name */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{program.name}</h4>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
                  
                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)}`}>
                      {program.status}
                    </span>
                  </div>
                  
                
                  
                  {/* View Details */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaInfoCircle className="text-sm" />
                    </div>
                    <div className={`flex items-center gap-2 ${colors.text} font-medium`}>
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
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600">Try searching with different keywords</p>
          </div>
        )}

        {/* Program Details Modal */}
        {selectedProgram && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${getColorClasses(selectedProgram.color).bg} rounded-xl flex items-center justify-center`}>
                      <FaCity className={`text-2xl ${getColorClasses(selectedProgram.color).text}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedProgram.name}</h2>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span className="text-gray-600">{selectedProgram.city}</span>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedProgram.status)}`}>
                          {selectedProgram.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseDetails}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Program Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Description</h3>
                  <p className="text-gray-700">{selectedProgram.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{selectedProgram.participants}</div>
                    <div className="text-sm text-gray-600">Participants</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{selectedProgram.target}</div>
                    <div className="text-sm text-gray-600">Target</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {calculateProgress(selectedProgram.participants, selectedProgram.target)}%
                    </div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedProgram.startDate.split('-')[2]}/{selectedProgram.startDate.split('-')[1]}/{selectedProgram.startDate.split('-')[0]}
                    </div>
                    <div className="text-sm text-gray-600">Start Date</div>
                  </div>
                </div>

                {/* Objectives */}
                {programDetails[selectedProgram.id]?.objectives && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Objectives</h3>
                    <ul className="space-y-2">
                      {programDetails[selectedProgram.id].objectives.map((obj, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {programDetails[selectedProgram.id]?.timeline && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Timeline</h3>
                    <div className="space-y-3">
                      {programDetails[selectedProgram.id].timeline.map((phase, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{phase.phase}</div>
                            <div className="text-sm text-gray-600">{phase.date}</div>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            phase.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            phase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {phase.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Want to participate?</h4>
                  <p className="text-gray-700 mb-4">
                    Join this city program and get access to exclusive resources, counseling sessions, and opportunities.
                  </p>
                  <button
                   onClick={() => navigate("/contact")}
                   className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors hover:shadow-lg cursor-pointer">
                    Book a Counseling Session
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={handleCloseDetails}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:shadow-sm"
                  >
                    Close
                  </button>
              
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow border border-gray-200">
            <span className="text-gray-600">Total Programs:</span>
            <span className="font-bold text-purple-600 text-lg">{cityPrograms.length}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-600">Active Cities:</span>
            <span className="font-bold text-green-600 text-lg">
              {cityPrograms.filter(p => p.status === 'Active').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityTargetDashboard;