const Meal = require('../models/Meal');
const RozaMeal = require('../models/RozaMeal');
// Controller function to get meals by date


const getMealsByDate = async (req, res) => {
  const date = req.params.date.split('T')[0]; // Extract the date part from the URL path (format: YYYY-MM-DD)
  
  console.log('Fetching meals for date:', date); // Log the date parameter

  try {
    console.log('Starting aggregation query');

    const matchStage = {
      $match: {
        $expr: {
          $eq: [
            { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            date
          ]
        }
      }
    };

    const sortStage = {
      $sort: { date: -1 } // Sort by date in descending order
    };

    const groupStage = {
      $group: {
        _id: "$sid",
        latestMeal: { $first: "$$ROOT" } // Get the first document per group (latest one)
      }
    };

    const replaceRootStage = {
      $replaceRoot: { newRoot: "$latestMeal" } // Replace the root with the latest meal document
    };

 

    const meals = await Meal.aggregate([
      matchStage,
      sortStage,
      groupStage,
      replaceRootStage
    ]);

  
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals by date:', error.message);
    res.status(500).json({ message: 'Failed to fetch meals' });
  }
};

const getRozaMealsByDate = async (req, res) => {
  const date = req.params.date.split('T')[0]; // Extract the date part from the URL path (format: YYYY-MM-DD)
  
  console.log('Fetching Roza meals for date:', date); // Log the date parameter

  try {
    

    const matchStage = {
      $match: {
        $expr: {
          $eq: [
            { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            date
          ]
        }
      }
    };

    

    const sortStage = {
      $sort: { date: -1 } // Sort by date in descending order
    };

    

    const groupStage = {
      $group: {
        _id: "$id",
        latestMeal: { $first: "$$ROOT" } // Get the first document per group (latest one)
      }
    };

   

    const replaceRootStage = {
      $replaceRoot: { newRoot: "$latestMeal" } // Replace the root with the latest meal document
    };

    

    const meals = await RozaMeal.aggregate([
      matchStage,
      sortStage,
      groupStage,
      replaceRootStage
    ]);

    

    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching Roza meals by date:', error.message);
    res.status(500).json({ message: 'Failed to fetch Roza meals' });
  }
};




// Controller function to get all meals
const getAllMeals = async (req, res) => {
  
  try {
    // Query all meals from MongoDB
    const meals = await Meal.find();
    
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching all meals:', error.message);
    res.status(500).json({ message: 'Failed to fetch all meals' });
  }
};
const getRozaAllMeals = async (req, res) => {
  
  try {
    // Query all meals from MongoDB
    const meals = await RozaMeal.find();
    
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching all meals:', error.message);
    res.status(500).json({ message: 'Failed to fetch all meals' });
  }
};
const deleteAllMeals = async (req, res) => {
  try {
    const result = await Meal.deleteMany({});
    res.status(200).json({ message: 'All meals deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all meals', error });
  }
};
const deleteAllMealsRoza = async (req, res) => {
  try {
    const result = await RozaMeal.deleteMany({});
    res.status(200).json({ message: 'All meals deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all meals', error });
  }
};
module.exports = {
  getMealsByDate,
  getAllMeals,
  getRozaAllMeals,
  deleteAllMeals,
  deleteAllMealsRoza,
  getRozaMealsByDate
};
