const request = require('supertest');
const app = require('../src/app');

describe('Habit Tracker API', () => {
  it('should create a new habit', async () => {
    const response = await request(app)
      .post('/habits')
      .send({
        name: 'Exercise',
        description: 'Daily exercise',
        target_days_per_week: 5
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Exercise');
    expect(response.body.message).toBe('Habit created successfully.');
  });

  it('should log a habit completion', async () => {
    const habit = await request(app)
      .post('/habits')
      .send({
        name: 'Reading',
        description: 'Read a book',
        target_days_per_week: 4
      });

    const response = await request(app)
      .post(`/habits/${habit.body.id}/log`)
      .send({ date: '2024-08-23' });

    expect(response.statusCode).toBe(201);
    expect(response.body.date).toBe('2024-08-23');
    expect(response.body.message).toBe('Completion logged successfully.');
  });

  it('should retrieve a list of habits', async () => {
    const response = await request(app).get('/habits');

    expect(response.statusCode).toBe(200);
    expect(response.body.habits.length).toBeGreaterThan(0);
  });

  it('should delete a habit', async () => {
    const habit = await request(app)
      .post('/habits')
      .send({
        name: 'Meditation',
        description: 'Daily meditation',
        target_days_per_week: 7
      });

    const response = await request(app)
      .delete(`/habits/${habit.body.id}`);

    expect(response.statusCode).toBe(204);
  });
});
