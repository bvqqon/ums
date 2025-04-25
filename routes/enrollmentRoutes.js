const express = require('express');
const { enrollStudent } = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, enrollStudent);

module.exports = router;
