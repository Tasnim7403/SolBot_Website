const Staff = require('../models/Staff');
const User = require('../models/User');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private
exports.getStaff = async (req, res) => {
  try {
    // Add pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Add filtering
    let query = {};
    
    // Filter by name, email, or role
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { role: searchRegex }
        ]
      };
    }
    
    // Filter by department
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    const staff = await Staff.find(query)
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });
    
    // Get total count for pagination
    const total = await Staff.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: staff.length,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Private
exports.getStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new staff member
// @route   POST /api/staff
// @access  Private
exports.createStaffMember = async (req, res) => {
  try {
    // Add user ID to request body
    req.body.user = req.user.id;
    
    const staff = await Staff.create(req.body);
    
    res.status(201).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update staff member
// @route   PUT /api/staff/:id
// @access  Private
exports.updateStaffMember = async (req, res) => {
  try {
    let staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete staff member
// @route   DELETE /api/staff/:id
// @access  Private
exports.deleteStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    await staff.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add assignment to staff member
// @route   POST /api/staff/:id/assignments
// @access  Private
exports.addAssignment = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    // Add assignedBy field
    req.body.assignedBy = req.user.id;
    
    staff.assignments.push(req.body);
    
    await staff.save();
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove assignment from staff member
// @route   DELETE /api/staff/:id/assignments/:assignmentId
// @access  Private
exports.removeAssignment = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    // Find assignment index
    const assignmentIndex = staff.assignments.findIndex(
      assignment => assignment._id.toString() === req.params.assignmentId
    );
    
    if (assignmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    // Remove assignment
    staff.assignments.splice(assignmentIndex, 1);
    
    await staff.save();
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update assignment status
// @route   PUT /api/staff/:id/assignments/:assignmentId
// @access  Private
exports.updateAssignment = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }
    
    // Find assignment
    const assignment = staff.assignments.id(req.params.assignmentId);
    
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    
    // Update assignment fields
    Object.keys(req.body).forEach(key => {
      assignment[key] = req.body[key];
    });
    
    await staff.save();
    
    res.status(200).json({
      success: true,
      data: staff
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get staff statistics
// @route   GET /api/staff/stats
// @access  Private
exports.getStaffStats = async (req, res) => {
  try {
    // Get total staff count
    const totalStaff = await Staff.countDocuments();
    
    // Get active staff count
    const activeStaff = await Staff.countDocuments({ status: 'active' });
    
    // Get inactive staff count
    const inactiveStaff = await Staff.countDocuments({ status: 'inactive' });
    
    // Get on-leave staff count
    const onLeaveStaff = await Staff.countDocuments({ status: 'on-leave' });
    
    // Get staff count by department
    const departmentStats = await Staff.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get staff count by role
    const roleStats = await Staff.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get assignment statistics
    const assignmentStats = await Staff.aggregate([
      { $unwind: '$assignments' },
      {
        $group: {
          _id: '$assignments.status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalStaff,
        activeStaff,
        inactiveStaff,
        onLeaveStaff,
        departmentStats,
        roleStats,
        assignmentStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
