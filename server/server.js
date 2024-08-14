const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Routine = require('./models/Routine');
const RozaRoutine = require('./models/RozaRoutine');
const Roza = require('./models/Roza');
const Admin = require('./models/Admin');
const TeaAvailability = require('./models/TeaAvailability');
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define Routes
app.use('/api/admin', require('./routes/studentRoutes'));
app.use('/api/meals', require('./routes/mealRoutes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  // Development route for root URL
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Initialize database and start server
const initialize = async () => {
  try {
    // Connect Database
    await connectDB();

    // Check if a Routine document exists, if not, create one
    const existingRoutine = await Routine.findOne();
    if (!existingRoutine) {
      const newRoutine = new Routine();
      await newRoutine.save();
      console.log('Routine document created');
    }
    const existingrozaRoutine = await RozaRoutine.findOne();
    if (!existingrozaRoutine) {
      const newrozaRoutine = new RozaRoutine();
      await newrozaRoutine.save();
      console.log('Roza routine document created');
    }
    const existingRoutinee = await Roza.findOne();
    if (!existingRoutinee) {
      const newRoutinee = new Roza();
      await newRoutinee.save();
      console.log('Roza document created');
    }
    const existingRoutineee = await Admin.findOne();
    if (!existingRoutineee) {
      const newRoutineee = new Admin();
      const saltRounds = parseInt(process.env.ADMIN_PASS_SALT);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, saltRounds);
      newRoutineee.password=hashedPassword;
      await newRoutineee.save();
      console.log('Admin document created');
    }
    //admin pass change korte env te passwod change then mongo theke admin existing document delete koro
    // Check if a TeaAvailability document exists, if not, create one
    const existingTeaAvailability = await TeaAvailability.findOne();
    if (!existingTeaAvailability) {
      const newTeaAvailability = new TeaAvailability();
      await newTeaAvailability.save();
      console.log('TeaAvailability document created');
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }
};

initialize();
