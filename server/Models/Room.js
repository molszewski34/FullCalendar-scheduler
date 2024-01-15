const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  roomName: String,
  roomNumOfGuests: Number,
  RoomPriceOfGuest: Number,
  isApartment: Boolean,
  roomColor: String,
  roomLocation: String,
  events: [
    {
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
        guestsFee: [Number],
      },
    },
  ],
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
