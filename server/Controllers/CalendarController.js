const router = require('express').Router();
const Event = require('../Models/Event');

router.get('/get-events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/create-event', async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).send(err);
  }
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
