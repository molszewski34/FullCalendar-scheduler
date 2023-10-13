const router = require('express').Router();
const Event = require('../Models/Event');

router.post('/create-event', async (req, res) => {
  try {
    const { title, start, end, extendedProps } = req.body;
    const event = new Event({
      title,
      start: new Date(start),
      end: new Date(end),
      extendedProps,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas zapisywania wydarzenia' });
  }
});

router.get('/get-events', async (req, res) => {
  const { start, end } = req.query;
  const events = await Event.find({
    start: { $gte: new Date(start), $lte: new Date(end) },
  });
  res.send(events);
});

router.delete('/delete-event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      res.status(200).send({ message: 'Event deleted successfully' });
    } else {
      res.status(404).send({ message: 'Event not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error deleting event', error: error.message });
  }
});

router.put('/update-event/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const updatedEventData = req.body;

    const event = await Event.findByIdAndUpdate(eventId, updatedEventData, {
      new: true,
    });
    event.title = updatedEventData.title;
    event.start = new Date(updatedEventData.start);
    event.end = new Date(updatedEventData.end);

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

module.exports = router;
