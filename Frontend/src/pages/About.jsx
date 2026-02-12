import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/Founder.png";
import { motion } from "framer-motion";


import {
  ShieldCheck,
  Users,
  Sparkles,
  Target,
  CheckCircle,
  Award,
  Globe,
  MessageCircle,
  Shield,
  Zap,
  GraduationCap,
  BriefcaseMedical,
  School,
  Building,
  Target as TargetIcon,
  TrendingUp,
  Star,
  Phone,
  User,
  ArrowRight,
  Calendar,
  BookOpen,
  Headphones,
  BadgeCheck,
  ThumbsUp
} from 'lucide-react';

const About = () => {
  const trustPoints = [
    {
      icon: <Users className="w-6 h-6" />,
      text: "Trusted by Many Students",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      text: "Expert Counsellor Team",
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      text: "All India Colleges",
      color: "bg-gradient-to-br from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      text: "Fast Admission Process",
      color: "bg-gradient-to-br from-amber-500 to-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Full Support Till Admission",
      color: "bg-gradient-to-br from-rose-500 to-red-500"
    }
  ];

  const internships = [
    {
      icon: <BriefcaseMedical className="w-7 h-7" />,
      title: "Hospital Internship",
      description: "Hands-on healthcare experience"
    },
    {
      icon: <School className="w-7 h-7" />,
      title: "School Internship",
      description: "Teaching & administration"
    },
    {
      icon: <Building className="w-7 h-7" />,
      title: "Corporate Internship",
      description: "Professional environment exposure"
    },
    {
      icon: <TargetIcon className="w-7 h-7" />,
      title: "Management Internship",
      description: "Leadership development"
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Practical Training",
      description: "Skill workshops & labs"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Students Guided", icon: <Users className="w-6 h-6" /> },
    { value: "98%", label: "Success Rate", icon: <Star className="w-6 h-6" /> },
    { value: "12+", label: "Years Experience", icon: <Calendar className="w-6 h-6" /> },
    { value: "1000+", label: "Colleges Network", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Consultation",
      description: "Free expert consultation",
      icon: <Headphones className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      step: "2",
      title: "Profile Analysis",
      description: "Academic & career assessment",
      icon: <Target className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      step: "3",
      title: "College Shortlisting",
      description: "Personalized college list",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      step: "4",
      title: "Admission Support",
      description: "Application & documentation",
      icon: <BadgeCheck className="w-6 h-6" />,
      color: "from-amber-500 to-amber-600"
    }
  ];

  const coreValues = [
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Trust & Transparency",
      description: "Complete honesty in guidance and process"
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Student-Centric",
      description: "Every decision focuses on student benefit"
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Excellence",
      description: "Commitment to highest quality service"
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: "Support",
      description: "End-to-end handholding till admission"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

<section className="relative pt-20 pb-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50" />

  <div className="container relative mx-auto px-6">
    <div className="max-w-3xl mx-auto text-center">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-sm text-blue-600 text-sm font-medium mb-8 border border-blue-100"
      >
        <Award className="w-4 h-4" />
        <span>Trusted Since 2012 • 15,000+ Success Stories</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
      >
        Your Journey to
        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dream College Starts Here
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto"
      >
        Expert admission counseling, career guidance, and complete support
        for students across India. From college selection to admission confirmation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link to="/contact">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Free Admission Consultation
          </button>
        </Link>
      </motion.div>

    </div>
  </div>
</section>



      {/* Trust Points */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Thousands Trust SS Admission Vala
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our proven track record and student-first approach make us the preferred choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {trustPoints.map((point, idx) => (
              <div 
                key={idx}
                className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className={`w-12 h-12 rounded-xl ${point.color} flex items-center justify-center shadow-lg`}>
                    <div className="text-white">
                      {point.icon}
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="font-semibold text-gray-800 text-sm md:text-base">{point.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
<section className="py-12 md:py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

    
      <div className="relative flex justify-center">
        <div className="relative max-w-sm sm:max-w-md w-full">

          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent z-10" />

            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={logo}
                alt="Amit Sinha - Founder & Director"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5" />
            </div>

          
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg text-xs sm:text-sm font-semibold">
                Founder & Director
              </div>
            </div>
          </div>

       
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 sm:px-7 py-3 sm:py-4 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Experience</p>
                  <p className="text-lg sm:text-xl font-bold">9+ Years</p>
                </div>
              </div>
            </div>
          </div>

         
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl -z-10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-2xl -z-10" />
        </div>
      </div>

      {/* Content Section */}
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-5">
          <Sparkles className="w-4 h-4" />
          <span>From the Founder's Desk</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Amit Sinha
        </h2>

        <p className="text-blue-600 font-semibold mb-4">
          Faculty of Management & Educational Counsellor
        </p>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Working as an Educational Counsellor with over <b>9+ years of experience</b>,
            providing career guidance and admission support.
          </p>

          <p>
            Actively helping students in <b>Bhopal (MP), Uttar Pradesh & Bihar</b>
            to choose the right career path and secure admissions.
          </p>

          <p className="italic border-l-4 border-blue-500 pl-5">
            "Honest guidance, transparency, and student-first approach
            are the core values behind SS Admission Vala."
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-6 h-6 text-blue-600" />
              <p className="text-2xl sm:text-3xl font-bold">15,000+</p>
            </div>
            <p className="text-gray-600 text-sm">Students Guided</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
            <div className="flex items-center gap-3 mb-1">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
              <p className="text-2xl sm:text-3xl font-bold">98%</p>
            </div>
            <p className="text-gray-600 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Support */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-200 to-emerald-200 flex items-center justify-center">
                      <BriefcaseMedical className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Real-World Experience</h3>
                    <p className="text-gray-600">Internship & Training Programs</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Beyond Academics</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Career-Ready Through 
                <span className="text-emerald-600"> Practical Experience</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8">
                We believe education is complete only with practical exposure. That's why 
                we provide comprehensive internship support across various sectors.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {internships.map((internship, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                      <div className="text-blue-600">
                        {internship.icon}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-center mb-1 text-sm">
                      {internship.title}
                    </h4>
                    <p className="text-xs text-gray-500 text-center">
                      {internship.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Complete Career Development</h4>
                    <p className="text-gray-700">
                      From admission to internship to placement - we provide end-to-end 
                      career guidance to make you industry-ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple & Transparent Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From consultation to admission - we guide you through every step
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative z-10">
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our values define our approach and commitment to every student
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <div 
                key={idx}
                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full translate-y-32 -translate-x-32" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ready to Start Your Academic Journey?
                </h2>
                <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                  Take the first step towards your dream college with expert guidance 
                  and complete support at every stage.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      Book Free Consultation
                    </button>
                  </Link>
                  <Link to="/course-pages-dashboard">
                    <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all border-2 border-blue-600 hover:border-blue-700 flex items-center gap-3">
                      <GraduationCap className="w-5 h-5" />
                      Explore Our Services
                    </button>
                  </Link>
                </div>
                
                <p className="text-gray-500 text-sm mt-8">
                  Get response soon • No obligation consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;