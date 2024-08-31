const Meal = require('../models/Meal');
const RozaMeal = require('../models/RozaMeal');
const Student = require('../models/Student'); 
const MealPrice = require('../models/MealPrice'); 
// Controller function to save meal selections

const saveMealSelection = async (req, res) => {

  const { sid, breakfast, lunch, dinner, comments, date } = req.body;
  const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
  const pricing = await MealPrice.findOne();
  console.log(day)
  try {
    // Fetch the student information using the sid
    const student = await Student.findOne({ id: sid });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log(pricing)
    // Create a new meal with student information
    console.log(pricing[day].Morning);
    const newMeal = new Meal({
      sid,
      breakfast,
      breakfastPrice: pricing[day].Morning,
      lunch,
      lunchPrice: pricing[day].Noon,
      dinner,
      dinnerPrice: pricing[day].Dinner,
      comments,
      date,
      day,
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
const getMonthlyBills = async (req, res) => {
  const { year, month } = req.params; // Expecting format: YYYY and MM
  console.log({ year, month });
  
  try {
    // Define start and end dates for the month
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); // Set to the first day of the next month
    
    // Find latest meal selection for each student per day in the month
    const latestMeals = await Meal.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $sort: { date: -1 } // Sort by date in descending order
      },
      {
        $group: {
          _id: {
            sid: "$sid",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
          },
          latestMeal: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestMeal" }
      }
    ]);

    // Map latest meals by student ID
    const studentMealMap = latestMeals.reduce((acc, meal) => {
      const { sid, date, breakfast, breakfastPrice, lunch, lunchPrice, dinner, dinnerPrice } = meal;
      if (!acc[sid]) acc[sid] = {};
      acc[sid][date] = { breakfast, breakfastPrice, lunch, lunchPrice, dinner, dinnerPrice };
      return acc;
    }, {});

    // Fetch meal prices
    const pricing = await MealPrice.findOne();
    
    // Calculate bills
    const studentBills = {};
    
    for (const [sid, meals] of Object.entries(studentMealMap)) {
      let total = 0;
      const student = await Student.findOne({ id: sid });
      
      console.log(`Calculating bill for student ${sid} (${student.name})`);
      
      for (const [date, meal] of Object.entries(meals)) {
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        
        // Log the details for each day and meal
        //console.log(`Date: ${date} (${day})`);
        //console.log(`  Breakfast: ${meal.breakfast ? `Included at ${meal.breakfastPrice}` : 'Not included'}`);
        //console.log(`  Lunch: ${meal.lunch ? `Included at ${meal.lunchPrice}` : 'Not included'}`);
        //console.log(`  Dinner: ${meal.dinner ? `Included at ${meal.dinnerPrice}` : 'Not included'}`);
        
        // Calculate total for the student
        total += (meal.breakfast ? meal.breakfastPrice : 0) + (meal.lunch ? meal.lunchPrice : 0) + (meal.dinner ? meal.dinnerPrice : 0);
      }
      
      // Store the bill for the student
      studentBills[sid] = {
        total,
        studentInfo: student
      };
    }

    res.status(200).json(studentBills);
  } catch (error) {
    console.error('Error fetching monthly bills:', error.message);
    res.status(500).json({ message: 'Failed to fetch monthly bills' });
  }
};

module.exports = { saveMealSelection ,saveRozaMealSelection,deleteStudent,getMonthlyBills};
