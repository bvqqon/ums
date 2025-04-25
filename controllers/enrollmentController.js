const Student = require('../models/studentModel');
const Course = require('../models/courseModel');

const enrollStudent = async (req, res) => {
    try {
        if (!['TEACHER', 'ADMIN'].includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { studentId, courseId } = req.body;
        if (!studentId || !courseId) {
            return res.status(400).json({ error: 'Student ID and Course ID are required' });
        }

        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ error: 'Student or Course not found' });
        }

        student.courses.push(courseId);
        await student.save();

        res.status(200).json({ message: 'Student enrolled successfully', student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { enrollStudent };
