const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    nombre: String,
    equipo: String,
    precio: Number,
});

module.exports = mongoose.model('Players', PlayerSchema);