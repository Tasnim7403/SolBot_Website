const express = require('express');
const {
  getStaff,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  addAssignment,
  removeAssignment,
  updateAssignment,
  getStaffStats
} = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Stats route
router.get('/stats', authorize('admin', 'manager'), getStaffStats);

// Main routes
router.route('/')
  .get(getStaff)
  .post(authorize('admin', 'manager'), createStaffMember);

router.route('/:id')
  .get(getStaffMember)
  .put(authorize('admin', 'manager'), updateStaffMember)
  .delete(authorize('admin', 'manager'), deleteStaffMember);

// Assignment routes
router.route('/:id/assignments')
  .post(authorize('admin', 'manager'), addAssignment);

router.route('/:id/assignments/:assignmentId')
  .put(updateAssignment)
  .delete(authorize('admin', 'manager'), removeAssignment);

module.exports = router;
