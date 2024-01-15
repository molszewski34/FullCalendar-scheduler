const router = require('express').Router();
const Room = require('../Models/Room');

router.get('/get-rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get-room/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/create-room', async (req, res) => {
  const room = new Room(req.body);

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/update-room/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, {
      new: true,
    });
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/delete-room/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndRemove(req.params.roomId);
    res.json({ message: 'Room deleted successfully', room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
