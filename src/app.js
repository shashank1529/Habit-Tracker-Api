const express = require('express');
const habitRoutes = require('./routes/habitRoutes');

const app = express();

app.use(express.json());
app.use('/habits', habitRoutes);

module.exports = app;
