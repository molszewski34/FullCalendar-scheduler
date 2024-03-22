require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

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

app.use('/api/rooms', require('./Controllers/RoomController'));
app.use('/api/events', require('./Controllers/EventController'));

connectToDatabase();

app.listen(5000, () => console.log('Server started'));
