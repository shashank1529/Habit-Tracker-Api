const { createHabit, findHabitById, logCompletion, deleteHabit, getHabits } = require('../models/habitModel');

const createHabitController = (req, res) => {
  const { name, description, target_days_per_week } = req.body;

  if (!name || !description || !target_days_per_week) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  const habit = createHabit(name, description, target_days_per_week);
  res.status(201).json({ ...habit, message: 'Habit created successfully.' });
};

const logHabitController = (req, res) => {
  const { id } = req.params;
  const { date } = req.body;

  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'Invalid date format.' });
  }

  const habit = findHabitById(id);
  if (!habit) {
    return res.status(404).json({ error: 'Habit not found.' });
  }

  const result = logCompletion(habit, date);
  if (result.error) {
    return res.status(409).json({ error: result.error });
  }

  res.status(201).json({ id: habit.id, date, message: 'Completion logged successfully.' });
};

const getHabitsController = (req, res) => {
  const habits = getHabits(req.query);
  res.status(200).json(habits);
};

const deleteHabitController = (req, res) => {
  const { id } = req.params;

  if (!findHabitById(id)) {
    return res.status(404).json({ error: 'Habit not found.' });
  }

  deleteHabit(id);
  res.status(200).json({ message: 'Habit deleted successfully.' });
};

module.exports = {
  createHabitController,
  logHabitController,
  getHabitsController,
  deleteHabitController
};
