const Client = require("../models/Client");
const ExcelJS = require('exceljs');
const { sendCareerEmail } = require("../config/emailConfig");


exports.createClient = async (req, res) => {
  try {
    // Add new tracking fields
    const clientData = {
      ...req.body,
      isNew: true,
      domainViewed: false,
      courseViewed: false,
      studentViewed: false,
      newAt: new Date()
    };
    
    const client = await Client.create(clientData);
    
    res.status(201).json({ 
      success: true, 
      client,
      message: "Client created successfully" 
    });

    console.log(` IMMEDIATE email sending started for: ${client.email}`);
    
    sendCareerEmail(
      client.email,
      client.fullName || "Client",
      client.phone || "Not provided",
      client.city || "Not specified",
      client.message || "Career guidance query"
    ).then(result => {
      const timestamp = new Date().toLocaleTimeString();
      if (result && result.success) {
        console.log(`[${timestamp}] Email SENT to ${client.email} (Message ID: ${result.messageId || 'N/A'})`);
      } else {
        console.log(`[${timestamp}] Email FAILED for ${client.email}: ${result?.error || 'Unknown error'}`);
      }
    }).catch(err => {
      const timestamp = new Date().toLocaleTimeString();
      console.log(` [${timestamp}] Email ERROR: ${err.message}`);
    });

  } catch (error) {
    console.error(" Create client error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};


exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json({ success: true, clients });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await client.deleteOne();
    res.json({ success: true, message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   UPDATE CLIENT STATUS (Protected)
================================ */
exports.updateClientStatus = async (req, res) => {
  const { status } = req.body;
  const allowedStatus = ["new", "in-progress", "completed"];
  
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ success: true, client });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   GET CLIENTS BY CATEGORY (Protected)
================================ */
exports.getClientsByCategory = async (req, res) => {
  const { category } = req.params;
  const allowedCategories = [
    "Career Counselors",
    "Relationship Counselors",
    "Mental Health Counselors",
    "Educational Counselors",
  ];

  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const clients = await Client.find({ category }).sort({
      createdAt: -1,
    });

    res.json({ success: true, clients });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   GET CLIENTS BY DOMAIN (Protected)
================================ */
exports.getClientsByDomain = async (req, res) => {
  const { domain } = req.params;
   console.log("hello");

  const allowedDomains = [
    "MEDICAL",
    "PHARMACY", 
    "NURSING",
    "PARAMEDICAL",
    "ENGINEERING",
    "MANAGEMENT",
    "GRADUATION",
    "POST GRADUATION",
    "VOCATIONAL",
    "LANGUAGES",
    "AGRICULTURE",
    "EDUCATION",
  ];

  if (!allowedDomains.includes(domain)) {
    return res.status(400).json({
      success: false,
      message: "Invalid course domain",
    });
  }

  try {
    const clients = await Client.find({ domain }).sort({
      createdAt: -1,
    });

    console.log(clients);
    

    res.status(200).json({
      success: true,
      total: clients.length,
      data: clients,
    });
  } catch (error) {
    console.error("Get clients by domain error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   EXPORT CLIENTS TO EXCEL (Protected)
================================ */
exports.exportClientsToExcel = async (req, res) => {
  try {
    console.log('Excel export request received');

    const clients = await Client.find({}).sort({ createdAt: -1 });
    
    console.log(`Found ${clients.length} clients to export`);

    if (!clients || clients.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No clients found to export" 
      });
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CareerGuide System';
    workbook.lastModifiedBy = 'Counselor';
    workbook.created = new Date();
    workbook.modified = new Date();
    
    const worksheet = workbook.addWorksheet('Students Data');

    worksheet.columns = [
      { header: 'S.No', key: 'sno', width: 8 },
      { header: 'Student ID', key: '_id', width: 28 },
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Email', key: 'email', width: 32 },
      { header: 'Phone', key: 'phone', width: 18 },
      { header: 'Date of Birth', key: 'dob', width: 15 },
      { header: 'Country', key: 'country', width: 18 },
      { header: 'State', key: 'state', width: 18 },
      { header: 'City', key: 'city', width: 18 },
      { header: 'Education Level', key: 'eduLevel', width: 20 },
      { header: 'Domain', key: 'domain', width: 20 },
      { header: 'Course', key: 'course', width: 25 },
      { header: 'Student Problem', key: 'message', width: 40 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Created Date', key: 'createdAt', width: 20 },
      { header: 'Last Updated', key: 'updatedAt', width: 20 }
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { 
      bold: true, 
      size: 11, 
      color: { argb: 'FFFFFF' },
      name: 'Arial'
    };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2E86C1' }
    };
    headerRow.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      wrapText: true
    };
    headerRow.height = 28;

    clients.forEach((client, index) => {
      const rowData = {
        sno: index + 1,
        _id: client._id.toString(),
        fullName: client.fullName || '-',
        email: client.email || '-',
        phone: client.phone || '-',
        dob: client.dob ? new Date(client.dob).toLocaleDateString('en-IN') : '-',
        country: client.country || '-',
        state: client.state || '-',
        city: client.city || '-',
        eduLevel: client.eduLevel || '-',
        domain: client.domain || '-',
        course: client.course || '-',
        message: client.message || '-',
        status: client.status || 'new',
        createdAt: new Date(client.createdAt).toLocaleString('en-IN'),
        updatedAt: new Date(client.updatedAt).toLocaleString('en-IN')
      };

      const row = worksheet.addRow(rowData);

      if (row.number % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F8F9FA' }
        };
      }

      const statusCell = row.getCell('status');
      if (client.status === 'completed') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D5F4E6' } };
        statusCell.font = { color: { argb: '1A7F5C' }, bold: true };
      } else if (client.status === 'in-progress') {
        statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3CD' } };
        statusCell.font = { color: { argb: '856404' }, bold: true };
      }

      row.getCell('sno').alignment = { horizontal: 'center' };
      row.getCell('message').alignment = { wrapText: true };
    });

    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const filename = `Students_Data_${timestamp}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    console.log(` Excel file "${filename}" ready for download (${clients.length} records)`);

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(' Excel export error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export data to Excel',
      error: error.message 
    });
  }
};

/* ===============================
   MARK DOMAIN AS VIEWED
================================ */
exports.markDomainAsViewed = async (req, res) => {
  try {
    const { domain } = req.params;
    
    // Update all students in this domain
    await Client.updateMany(
      { domain, domainViewed: false },
      { domainViewed: true }
    );

    res.status(200).json({
      success: true,
      message: "Domain marked as viewed"
    });

  } catch (error) {
    console.error("Mark domain as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   MARK COURSE AS VIEWED
================================ */
exports.markCourseAsViewed = async (req, res) => {
  try {
    const { course } = req.params;
    
    // Update all students in this course
    await Client.updateMany(
      { course, courseViewed: false },
      { courseViewed: true }
    );

    res.status(200).json({
      success: true,
      message: "Course marked as viewed"
    });

  } catch (error) {
    console.error("Mark course as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   MARK STUDENT AS VIEWED
================================ */
exports.markStudentAsViewed = async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      { 
        studentViewed: true,
        isNew: false 
      },
      { new: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student marked as viewed"
    });

  } catch (error) {
    console.error("Mark student as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET DOMAIN STATS WITH NEW COUNT
================================ */
exports.getDomainStats = async (req, res) => {
  try {
    const domains = [
      "MEDICAL", "PHARMACY", "NURSING", "PARAMEDICAL",
      "ENGINEERING", "MANAGEMENT", "GRADUATION", 
      "POST GRADUATION", "VOCATIONAL", "LANGUAGES",
      "AGRICULTURE", "EDUCATION"
    ];

    const stats = [];
    
    for (const domain of domains) {
      const total = await Client.countDocuments({ domain });
      const newCount = await Client.countDocuments({ 
        domain, 
        domainViewed: false,
        newAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
      });
      const inProgress = await Client.countDocuments({ domain, status: 'in-progress' });
      const completed = await Client.countDocuments({ domain, status: 'completed' });
      
      stats.push({
        domain,
        total,
        new: newCount,
        inProgress,
        completed,
        hasNew: newCount > 0
      });
    }

    // Overall stats
    const totalStudents = await Client.countDocuments();
    const totalNew = await Client.countDocuments({ 
      domainViewed: false,
      newAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalInProgress = await Client.countDocuments({ status: 'in-progress' });
    const totalCompleted = await Client.countDocuments({ status: 'completed' });

    res.status(200).json({
      success: true,
      domainStats: stats,
      overallStats: {
        total: totalStudents,
        new: totalNew,
        inProgress: totalInProgress,
        completed: totalCompleted
      }
    });

  } catch (error) {
    console.error("Domain stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET COURSE STATS WITH NEW COUNT
================================ */
exports.getCourseStats = async (req, res) => {
  try {
    const { domain } = req.params;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Domain is required"
      });
    }

    // Get all unique courses in this domain
    const courses = await Client.distinct("course", { domain });
    
    const courseStats = [];
    
    for (const course of courses) {
      if (course) {
        const total = await Client.countDocuments({ domain, course });
        const newCount = await Client.countDocuments({ 
          domain, 
          course, 
          courseViewed: false,
          newAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        
        courseStats.push({
          course,
          total,
          new: newCount,
          hasNew: newCount > 0
        });
      }
    }

    res.status(200).json({
      success: true,
      domain,
      courseStats
    });

  } catch (error) {
    console.error("Course stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET CLIENTS BY COURSE WITH VIEW STATUS
================================ */
exports.getClientsByCourse = async (req, res) => {
  try {
    const { course } = req.params;
    
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course name is required"
      });
    }

    const clients = await Client.find({ course })
    .sort({ createdAt: -1 });
      

    res.status(200).json({
      success: true,
      count: clients.length,
      course: course,
      data: clients
    });

  } catch (error) {
    console.error("Get clients by course error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET CLIENTS BY DYNAMIC FILTER
================================ */
exports.getClientsByDynamicFilter = async (req, res) => {
  try {
    const { filterField, filterValue } = req.query;
    
    if (!filterField || !filterValue) {
      return res.status(400).json({
        success: false,
        message: "filterField and filterValue are required"
      });
    }

    const allowedFields = ["domain", "status", "eduLevel", "country", "state", "city", "course"];
    
    if (!allowedFields.includes(filterField)) {
      return res.status(400).json({
        success: false,
        message: `Invalid filter field. Allowed: ${allowedFields.join(', ')}`
      });
    }

    const query = {};
    query[filterField] = filterValue;

    const clients = await Client.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });

  } catch (error) {
    console.error("Dynamic filter error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET DASHBOARD STATS (NEW - COMBINED)
================================ */
exports.getDashboardStats = async (req, res) => {
  try {
    const domains = [
      "MEDICAL", "PHARMACY", "NURSING", "PARAMEDICAL",
      "ENGINEERING", "MANAGEMENT", "GRADUATION", 
      "POST GRADUATION", "VOCATIONAL", "LANGUAGES",
      "AGRICULTURE", "EDUCATION"
    ];

    const domainStats = [];
    let totalNew = 0;
    let totalInProgress = 0;
    let totalCompleted = 0;
    
    for (const domain of domains) {
      const total = await Client.countDocuments({ domain });
      const newCount = await Client.countDocuments({ 
        domain, 
        domainViewed: false,
        newAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      });
      const inProgress = await Client.countDocuments({ domain, status: 'in-progress' });
      const completed = await Client.countDocuments({ domain, status: 'completed' });
      
      totalNew += newCount;
      totalInProgress += inProgress;
      totalCompleted += completed;
      
      domainStats.push({
        domain,
        total,
        new: newCount,
        inProgress,
        completed,
        hasNew: newCount > 0
      });
    }

    const totalStudents = totalNew + totalInProgress + totalCompleted;

    // Recent students (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentStudents = await Client.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Today's students
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayStudents = await Client.countDocuments({
      createdAt: { $gte: today }
    });

    res.status(200).json({
      success: true,
      data: {
        domainStats,
        summary: {
          total: totalStudents,
          new: totalNew,
          inProgress: totalInProgress,
          completed: totalCompleted,
          recent: recentStudents,
          today: todayStudents
        }
      }
    });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET RECENT NEW STUDENTS
================================ */
exports.getRecentNewStudents = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const newStudents = await Client.find({
      newAt: { $gte: sevenDaysAgo },
      domainViewed: false
    })
    .select('fullName email phone domain course status newAt domainViewed courseViewed studentViewed')
    .sort({ newAt: -1 })
    .limit(50);

    res.status(200).json({
      success: true,
      count: newStudents.length,
      data: newStudents
    });

  } catch (error) {
    console.error("Get recent new students error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   BULK MARK AS VIEWED
================================ */
exports.bulkMarkAsViewed = async (req, res) => {
  try {
    const { ids, type } = req.body; // type: 'domain', 'course', or 'student'
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Array of IDs is required"
      });
    }

    if (!type || !['domain', 'course', 'student'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be 'domain', 'course', or 'student'"
      });
    }

    let updateField = '';
    let query = { _id: { $in: ids } };

    switch (type) {
      case 'domain':
        updateField = 'domainViewed';
        break;
      case 'course':
        updateField = 'courseViewed';
        break;
      case 'student':
        updateField = 'studentViewed';
        break;
    }

    await Client.updateMany(
      query,
      { 
        [updateField]: true,
        ...(type === 'student' ? { isNew: false } : {})
      }
    );

    res.status(200).json({
      success: true,
      message: `Bulk marked ${type}s as viewed`,
      count: ids.length
    });

  } catch (error) {
    console.error("Bulk mark as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   GET UNVIEWED COUNTS
================================ */
exports.getUnviewedCounts = async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const domainUnviewed = await Client.countDocuments({
      domainViewed: false,
      newAt: { $gte: sevenDaysAgo }
    });

    const courseUnviewed = await Client.countDocuments({
      courseViewed: false,
      newAt: { $gte: sevenDaysAgo }
    });

    const studentUnviewed = await Client.countDocuments({
      studentViewed: false,
      isNew: true,
      newAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      success: true,
      counts: {
        domain: domainUnviewed,
        course: courseUnviewed,
        student: studentUnviewed
      }
    });

  } catch (error) {
    console.error("Get unviewed counts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/* ===============================
   AUTO MARK OLD AS VIEWED (CRON JOB)
================================ */
exports.autoMarkOldAsViewed = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    // Automatically mark students older than 30 days as viewed
    const result = await Client.updateMany(
      {
        newAt: { $lt: thirtyDaysAgo },
        $or: [
          { domainViewed: false },
          { courseViewed: false },
          { studentViewed: false },
          { isNew: true }
        ]
      },
      {
        domainViewed: true,
        courseViewed: true,
        studentViewed: true,
        isNew: false
      }
    );

    console.log(`Auto-marked ${result.modifiedCount} old students as viewed`);

    res.status(200).json({
      success: true,
      message: "Auto-marked old students as viewed",
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error("Auto mark old as viewed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};