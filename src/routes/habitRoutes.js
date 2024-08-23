const express = require('express');
const { createHabitController, logHabitController, getHabitsController, deleteHabitController } = require('../controllers/habitController');

const router = express.Router();

router.post('/', createHabitController);
router.post('/:id/log', logHabitController);
router.get('/', getHabitsController);
router.delete('/:id', deleteHabitController);

module.exports = router;
