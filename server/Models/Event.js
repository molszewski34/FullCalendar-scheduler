const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  start: Date,
  end: Date,
  title: String,
  phone: Number,
  numOfGuests: Number,
  priceOfGuest: Number,
  price: Number,
  room: String,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
