const Player = require('../models/player.model.js');

//Create new Player
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }

    // Create a Player
    const player = new Player({
        nombre: req.body.nombre || "No player title",
        equipo: req.body.equipo,
        precio: req.body.precio,
    });

    // Save Player in the database
    player.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the player."
        });
    });
};

// Retrieve all players from the database.
exports.findAll = (req, res) => {
    Player.find()
    .then(players => {
        res.send(players);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving players."
        });
    });
};

// Find a single player with a playerId
exports.findOne = (req, res) => {
    Player.findById(req.params.playerId)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving player with id " + req.params.playerId
        });
    });
};

// Update a player
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Player content can not be empty"
        });
    }

    // Find and update player with the request body
    Player.findByIdAndUpdate(req.params.playerId, {
        nombre: req.body.nombre || "No player title",
        equipo: req.body.equipo,
        precio: req.body.precio,
    }, {new: true})
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.playerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
    .then(player => {
        if(!player) {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        res.send({message: "Player deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Could not delete player with id " + req.params.playerId
        });
    });
};