require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  cors({
    origin: 'https://full-calendar-scheduler-client.vercel.app',
  })
);

app.use(express.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
app.use('/api/calendar', require('./Controllers/CalendarController'));

connectToDatabase();

app.listen(5000, () => console.log('Server started'));
