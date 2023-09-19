const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  start: Date,
  end: Date,
  title: String,
  extendedProps: {
    phone: Number,
    numOfGuests: Number,
    priceOfGuest: Number,
    price: Number,
    room: String,
    color: String,
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
