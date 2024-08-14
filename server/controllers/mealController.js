const Meal = require('../models/Meal');
const RozaMeal = require('../models/RozaMeal');
const Student = require('../models/Student'); 
// Controller function to save meal selections

const saveMealSelection = async (req, res) => {
  const { sid, breakfast, lunch, dinner, comments, date } = req.body;

  try {
    // Fetch the student information using the sid
    const student = await Student.findOne({ id: sid });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create a new meal with student information
    const newMeal = new Meal({
      sid,
      breakfast,
      lunch,
      dinner,
      comments,
      date,
      studentName: student.name, // Add the student name
      roomNo: student.roomNo      // Add the room number
    });

    await newMeal.save();
    res.status(201).json({ message: 'Meal selection saved successfully' });
  } catch (error) {
    console.error('Error saving meal selection:', error.message);
    res.status(500).json({ message: 'Failed to save meal selection' });
  }
};
const saveRozaMealSelection = async (req, res) => {
  const { sid,breakfast, lunch, dinner,iftar,sehri, comments,date } = req.body;

  try {
    const student = await Student.findOne({ id: sid });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const newMeal = new RozaMeal({
      id:sid,
      breakfast,
      lunch,
      dinner,
      iftar,
      sehri,
      comments,
      date,
      studentName: student.name, // Add the student name
      roomNo: student.roomNo      // Add the room number
    });

    await newMeal.save();
    res.status(201).json({ message: 'Roza meal selection saved successfully' });
  } catch (error) {
    console.error('Error saving meal selection:', error.message);
    res.status(500).json({ message: 'Failed to save meal selection' });
  }
};
const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};

module.exports = { saveMealSelection ,saveRozaMealSelection,deleteStudent};
