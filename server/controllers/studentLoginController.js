const Student = require('../models/Student');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginStudent = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    // Find the student by their ID and password
    const student = await Student.findOne({ id: studentId, password });

    if (!student) {
      return res.status(400).json({ message: 'Invalid student ID or password' });
    }
    const token = jwt.sign(
      { id: student.id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    // If login is successful
    res.status(200).json({ message: 'Login successful', student, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { password } = req.body;
  console.log(password)
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Provide correct credentials' });
    }
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { loginStudent, loginAdmin };
