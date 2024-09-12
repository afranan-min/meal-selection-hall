const Student = require('../models/Student');
const Routine = require('../models/Routine');
const RozaRoutine = require('../models/RozaRoutine');
const TeaAvailability = require('../models/TeaAvailability');
const Notification = require('../models/Notification');
const Complaint = require('../models/Complaint');
const Roza = require('../models/Roza');
const MealPrice = require('../models/MealPrice');
const RamadanMealPrice = require('../models/RamadanMealPrice');
const addStudent = async (req, res) => {
  const { id, name, password, department, level, roomNo } = req.body;

  try {
    const newStudent = new Student({ id, name, password, department, level, roomNo });
    await newStudent.save();
    res.status(201).send('Student added successfully');
  } catch (error) {
    res.status(500).send('Failed to add student');
  }
};
const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  try {
    const students = await Student.find();
    const student = students.find(student => student.id === id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const deletedStudent = await Student.findByIdAndDelete(student._id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};
const changeStudentPassword = async (req, res) => {
  const { studentId, newPassword } = req.body;

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.password = newPassword; // You might want to hash this password
    await student.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
const getRoutine = async (req, res) => {
  try {
    const routine = await Routine.findOne(); // Assuming there's only one routine document
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routine' });
  }
};
const getrozaRoutine = async (req, res) => {
  try {
    const routine = await RozaRoutine.findOne(); // Assuming there's only one routine document
    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routine' });
  }
};
const updateRoutine = async (req, res) => {
  console.log('Request body:');
  try {
    const updatedRoutine = req.body;

    // Log the incoming request body for debugging
    console.log('Request body:', updatedRoutine);

    // Check if routine ID exists
    const routine = await Routine.findOne();
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Update the routine
    await Routine.findByIdAndUpdate(routine._id, updatedRoutine, { new: true });

    // Fetch the updated routine to send back as a response
    const updatedRoutineFromDB = await Routine.findById(routine._id);
    res.status(200).json(updatedRoutineFromDB);
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const updaterozaRoutine = async (req, res) => {
  console.log('Request body:');
  try {
    const updatedRoutine = req.body;

    // Log the incoming request body for debugging
    console.log('Request body:', updatedRoutine);

    // Check if routine ID exists
    const routine = await RozaRoutine.findOne();
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    // Update the routine
    await RozaRoutine.findByIdAndUpdate(routine._id, updatedRoutine, { new: true });

    // Fetch the updated routine to send back as a response
    const updatedRoutineFromDB = await RozaRoutine.findById(routine._id);
    res.status(200).json(updatedRoutineFromDB);
  } catch (error) {
    console.error('Error updating routine:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getTeaAvailability = async (req, res) => {
  try {
    const teaAvailability = await TeaAvailability.findOne();
    res.json(teaAvailability || { available: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update tea availability
const updateTeaAvailability = async (req, res) => {
  try {
    const { available } = req.body;
    let teaAvailability = await TeaAvailability.findOne();
    if (!teaAvailability) {
      teaAvailability = new TeaAvailability({ available });
    } else {
      teaAvailability.available = available;
    }
    await teaAvailability.save();
    res.json(teaAvailability);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addNotification = async (req, res) => {
  try {
    const { description, date } = req.body;
    const newNotification = new Notification({ description, date });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error adding notification' });
  }
};
const getNotification = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

const getPriceroutine = async (req, res) => {
  try {
    const prices = await MealPrice.findOne();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error });
  }
};
const getrozaPriceroutine = async (req, res) => {
  try {
    const prices = await RamadanMealPrice.findOne();
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error });
  }
};
const updateMealPrices = async (req, res) => {
  console.log('Request body:');
  try {
    const updatedPrices = req.body;

    // Log the incoming request body for debugging
    console.log('Request body:', updatedPrices);

    // Check if price document exists
    const priceDoc = await MealPrice.findOne();
    if (!priceDoc) {
      return res.status(404).json({ message: 'Price document not found' });
    }

    // Update the price document
    await MealPrice.findByIdAndUpdate(priceDoc._id, updatedPrices, { new: true });

    // Fetch the updated price document to send back as a response
    const updatedPricesFromDB = await MealPrice.findById(priceDoc._id);
    res.status(200).json(updatedPricesFromDB);
  } catch (error) {
    console.error('Error updating meal prices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updaterozaMealPrices = async (req, res) => {
  console.log('Request body:');
  try {
    const updatedPrices = req.body;

    // Log the incoming request body for debugging
    console.log('Request body:', updatedPrices);

    // Check if price document exists
    const priceDoc = await RamadanMealPrice.findOne();
    if (!priceDoc) {
      return res.status(404).json({ message: 'Price document not found' });
    }

    // Update the price document
    await RamadanMealPrice.findByIdAndUpdate(priceDoc._id, updatedPrices, { new: true });

    // Fetch the updated price document to send back as a response
    const updatedPricesFromDB = await RamadanMealPrice.findById(priceDoc._id);
    res.status(200).json(updatedPricesFromDB);
  } catch (error) {
    console.error('Error updating meal prices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};
const addComplaint = async (req, res) => {
  try {
    const { studentId, name, complain, date } = req.body;

    const newComplaint = new Complaint({ studentId, name, complain, date });
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Error adding complaint' });
  }
};
const getComplaint = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};
const deleteAllComplaint = async (req, res) => {
  try {
    const complaints = await Complaint.deleteMany({});
    res.status(200).json({ message: 'All complaints deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete complaints' });
  }
};
const deleteOneComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaints = await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
};
const getRozastatus = async (req, res) => {
  try {
    const rozaStatus = await Roza.findOne();
    res.json(rozaStatus);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
const getStudentinfo = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from the database
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};
const postRozastatus = async (req, res) => {
  const { isRoza } = req.body;
  try {
    const rozaStatus = await Roza.findOne();
    if (rozaStatus) {
      rozaStatus.isRoza = isRoza;
      await rozaStatus.save();
      res.status(200).json(rozaStatus);
    } else {
      res.status(404).send('Roza status not found');
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
const changeStudentRoom = async (req, res) => {
  const { studentId, newRoomNo } = req.body;

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.roomNo = newRoomNo;
    await student.save();

    res.status(200).json({ message: 'Room number changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  addStudent,
  deleteStudentById,
  changeStudentPassword,
  getRoutine,
  updateRoutine,
  getTeaAvailability,
  updateTeaAvailability,
  addNotification,
  getNotification,
  deleteNotification,
  addComplaint,
  getComplaint,
  deleteAllComplaint,
  deleteOneComplaint,
  getRozastatus,
  postRozastatus,
  getStudentinfo,
  changeStudentRoom,
  getrozaRoutine,
  updaterozaRoutine,
  getPriceroutine,
  updateMealPrices,
  getrozaPriceroutine,
  updaterozaMealPrices
};
