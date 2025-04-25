const express = require('express');
const { createStudent, getStudentById } = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createStudent);
router.get('/:id', authMiddleware, getStudentById);

module.exports = router;
