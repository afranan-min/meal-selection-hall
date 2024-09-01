const express = require('express');
const router = express.Router();
const { saveMealSelection, saveRozaMealSelection,deleteStudent,getMonthlyBills ,getStudentMonthlyBills,getRozaMonthlyBills,getStudentRozaMonthlyBills} = require('../controllers/mealController');
const { getMealsByDate, getAllMeals,getRozaAllMeals,getRozaMealsByDate } = require('../controllers/getMealController');

// POST route to save meal selections
router.post('/save', saveMealSelection);
router.post('/roza-save', saveRozaMealSelection);
// DELETE route to delete a student by ID
router.delete('/students/:id', deleteStudent);

// GET route to fetch meals by specific date (/meal/:date)
router.get('/meals/:date', getMealsByDate);
router.get('/roza-meals/:date', getRozaMealsByDate);
// GET route to fetch all meals
router.get('/meals-all', getAllMeals);
router.get('/roza-meals-all', getRozaAllMeals);
router.get('/get-student-bills/:year/:month', getMonthlyBills);
router.get('/get-roza-student-bills/:year/:month', getRozaMonthlyBills);
router.get('/get-specipic-student-bill/:year/:month/:studentId', getStudentMonthlyBills);
router.get('/get-specipic-student-roza-bill/:year/:month/:studentId', getStudentRozaMonthlyBills);
module.exports = router;
