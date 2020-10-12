const db = require("../models");
const Calendars = db.Calendars;

exports.create = (req, res) => {
  if (
    !req.body.year ||
    !req.body.month ||
    !req.body.numberOfDays ||
    !req.body.startingDayOfTheWeek
  ) {
    res.status(400).send("All fields are required!");
    return;
  }

  const calendar = {
    year: req.body.year,
    month: req.body.month,
    numberOfDays: req.body.numberOfDays,
    startingDayOfTheWeek: req.body.startingDayOfTheWeek,
  };

  Calendars.create(calendar)
    .then((submittedCalendar) => res.status(201).send(submittedCalendar))
    .catch((err) => res.status(400).send(err));
};

exports.findAll = (req, res) => {
  Calendars.findAll()
    .then((calendars) => res.status(200).send(calendars))
    .catch((err) => res.status(400).send(err));
};

exports.findOne = (req, res) => {
  const calendarId = req.params.id;

  Calendars.findByPk(calendarId)
    .then((calendar) => res.status(200).send(calendar))
    .catch((err) => res.status(404).send(err));
};

exports.updateOne = (req, res) => {
  const calendarId = req.params.id;

  Calendars.update(
    {
      year: req.body.year,
      month: req.body.month,
      numberOfDays: req.body.numberOfDays,
      startingDayOfTheWeek: req.body.startingDayOfTheWeek,
    },
    {
      where: { id: calendarId },
    }
  )
    .then(() =>
      res
        .status(200)
        .send(`Successfully Updated Calendar with id ${calendarId}`)
    )
    .catch((err) => res.status(404).send(err));
};

exports.deleteOne = (req, res) => {
  calendarId = req.params.id;

  Calendars.destroy({
    where: { id: calendarId },
  })
    .then(() =>
      res
        .status(200)
        .send(`Successfully Deleted Calendar with id ${calendarId}`)
    )
    .catch((err) => res.status(404).send(err));
};
