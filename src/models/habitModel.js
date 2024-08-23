const habits = [];
let habitId = 1;

const createHabit = (name, description, targetDaysPerWeek) => {
  const habit = {
    id: habitId++,
    name,
    description,
    target_days_per_week: targetDaysPerWeek,
    completed_days: 0,
    logs: []
  };
  habits.push(habit);
  return habit;
};

const findHabitById = (id) => habits.find(h => h.id === parseInt(id));

const logCompletion = (habit, date) => {
  if (habit.logs.includes(date)) {
    return { error: 'Completion already logged for this date.' };
  }
  habit.logs.push(date);
  habit.completed_days++;
  return habit;
};

const deleteHabit = (id) => {
  const index = habits.findIndex(h => h.id === parseInt(id));
  if (index !== -1) {
    habits.splice(index, 1);
    return true;
  }
  return false;
};

const getHabits = (query) => {
  let filteredHabits = habits;

  if (query.status) {
    filteredHabits = filteredHabits.filter(h => (query.status === 'completed') ? h.completed_days >= h.target_days_per_week : h.completed_days < h.target_days_per_week);
  }

  if (query.name) {
    filteredHabits = filteredHabits.filter(h => h.name.includes(query.name));
  }

  const total = filteredHabits.length;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  return {
    habits: filteredHabits.slice(offset, offset + limit),
    total,
    page,
    limit
  };
};

module.exports = {
  createHabit,
  findHabitById,
  logCompletion,
  deleteHabit,
  getHabits
};
