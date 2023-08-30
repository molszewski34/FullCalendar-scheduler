const router = require('express').Router();
const Event = require('../Models/Event');
const moment = require('moment');

router.post('/create-event', async (req, res) => {
  const event = Event(req.body);
  await event.save();
  res.sendStatus(200);
});

router.get('/get-events', async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
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
    // const updatedEvent = {
    //   title: req.query.title,
    //   start: { $gte: moment(req.query.start).toDate() },
    //   end: { $lte: moment(req.query.end).toDate() },
    // };
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
