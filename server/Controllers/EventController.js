const router = require('express').Router();
const Room = require('../Models/Room');

router.get('/get-events', async (req, res) => {
  try {
    const rooms = await Room.find();
    const allEvents = rooms.reduce(
      (events, room) => [...events, ...room.events],
      []
    );
    res.status(200).json(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-event/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const rooms = await Room.find();
    const event = rooms.reduce((foundEvent, room) => {
      const roomEvent = room.events.find((e) => e._id.toString() === eventId);
      return roomEvent || foundEvent;
    }, null);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:roomId/create-event', async (req, res) => {
  const roomId = req.params.roomId;
  const eventData = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.events.push(eventData);
    await room.save();

    res
      .status(201)
      .json({ message: 'Event added successfully', event: eventData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:roomId/delete-event/:eventId', async (req, res) => {
  const roomId = req.params.roomId;
  const eventId = req.params.eventId;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const eventIndex = room.events.findIndex(
      (e) => e._id.toString() === eventId
    );

    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    room.events.splice(eventIndex, 1);
    await room.save();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:roomId/update-event/:eventId', async (req, res) => {
  const roomId = req.params.roomId;
  const eventId = req.params.eventId;
  const updatedEventData = req.body;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const eventIndex = room.events.findIndex(
      (e) => e._id.toString() === eventId
    );

    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    room.events[eventIndex] = {
      ...room.events[eventIndex],
      ...updatedEventData,
    };
    await room.save();

    res.status(200).json({
      message: 'Event updated successfully',
      event: room.events[eventIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
