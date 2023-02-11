import express from 'express';
import cors from 'cors';

const authController = require('./controllers/authController');
const slotMachineController = require('./controllers/slotMachineController');

const app = express();

// Express will handle with json requests
app.use(express.json());

// Inserting cors configuration in my express app
app.use(cors());

// Importing routes and inserting in my express app
app.use(authController);
app.use(slotMachineController);

// Configured port that the server will run
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
export default app;
