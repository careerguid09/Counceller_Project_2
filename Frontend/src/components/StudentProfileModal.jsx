// components/StudentProfileModal.jsx
import { motion } from 'framer-motion';
import { 
  X, MapPin, Calendar, Clock, Mail, Phone, 
  User, GraduationCap, Target, Award, BookOpen,
  Star, MessageSquare, FileText, TrendingUp,
  School, Globe, CheckCircle, ExternalLink
} from 'lucide-react';

const StudentProfileModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg flex items-center justify-center">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}&backgroundColor=059669`}
                    className="rounded-2xl w-20 h-20"
                    alt={student.name}
                  />
                </div>
                <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center ${
                  student.status === 'upcoming' 
                    ? 'bg-emerald-500' 
                    : 'bg-blue-500'
                }`}>
                  {student.status === 'upcoming' ? (
                    <Clock size={16} className="text-white" />
                  ) : (
                    <Award size={16} className="text-white" />
                  )}
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-bold">
                    <MapPin size={14} />
                    {student.location}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    student.status === 'upcoming' 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {student.status === 'upcoming' ? 'Confirmed Session' : 'Completed'}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-teal-100 text-teal-700">
                    {student.grade}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Academic Details Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <GraduationCap className="text-emerald-600" size={20} />
                  </div>
                  <span>Academic Profile</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <School className="text-emerald-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Current Grade</p>
                        <p className="text-lg font-bold text-gray-900">{student.grade}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Target className="text-blue-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Target Exam</p>
                        <p className="text-lg font-bold text-gray-900">{student.target}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Calendar className="text-amber-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Next Session</p>
                        <p className="text-lg font-bold text-gray-900">{student.date} • {student.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                        <BookOpen className="text-purple-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Session Type</p>
                        <p className="text-lg font-bold text-gray-900">{student.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <span>Contact & Communication</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                          <Mail className="text-emerald-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email</p>
                          <p className="text-base font-bold text-gray-900">
                            {student.email || 'student.email@example.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Phone className="text-blue-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Parent's Contact</p>
                          <p className="text-base font-bold text-gray-900">
                            {student.phone || '+91 98765 43210'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                          <MessageSquare className="text-amber-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Preferred Contact</p>
                          <p className="text-base font-bold text-gray-900">
                            WhatsApp & Email
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                          <Globe className="text-purple-500" size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Target Countries</p>
                          <p className="text-base font-bold text-gray-900">
                            USA, UK, Canada
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <FileText className="text-purple-600" size={20} />
                  </div>
                  <span>Progress Notes & History</span>
                </h3>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Sessions Completed</span>
                      <span className="font-bold text-gray-900">{student.sessionsCompleted || '8'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Mock Test Score</span>
                      <span className="font-bold text-emerald-600">+45% Improvement</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">University Shortlist</span>
                      <span className="font-bold text-blue-600">12 Universities</span>
                    </div>
                    <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Counselor Notes:</span> {student.notes || 'Showing consistent improvement in quantitative sections. Needs focus on essay writing for Ivy League applications.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Academic Performance</h3>
                
                <div className="space-y-5">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Test Readiness</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        85%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Profile Strength</span>
                      <span className="text-lg font-bold text-gray-900">
                        9.2/10
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <div 
                          key={star} 
                          className={`h-2 rounded-full ${star <= 9 ? 'bg-emerald-500' : 'bg-gray-300'}`}
                          style={{ width: '8%' }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/50">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Satisfaction</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={18} 
                            className="text-amber-400 fill-amber-400" 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    Schedule Next Session
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare size={18} />
                    Send Progress Update
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <FileText size={18} />
                    Add Session Notes
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-gray-800 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink size={18} />
                    View Full Application
                  </button>
                </div>
              </div>
              
              {/* Upcoming Deadlines */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-6 text-lg">Upcoming Deadlines</h3>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">SAT Registration</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                        Urgent
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Dec 20, 2024</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-900">Stanford Application</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                        Jan 5
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Jan 5, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentProfileModal;