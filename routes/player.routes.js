module.exports = (app) => {
  const players = require('../controllers/player.controller');

  // Create a new Player
  app.post('/players', players.create);

  // Retrieve all Players
  app.get('/players', players.findAll);

  // Retrieve a single Player with playerId
  app.get('/players/:playerId', players.findOne);

  // Update a Note with playerId
  app.put('/players/:playerId', players.update);

  // Delete a Note with playerId
  app.delete('/players/:playerId', players.delete);
}