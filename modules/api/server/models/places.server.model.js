'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Controller = require(path.resolve('./modules/api/server/models/controllers.server.model')),
    Sensor = require(path.resolve('./modules/api/server/models/sensors.server.model')),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    }
});

PlaceSchema.post('remove', function () {
    Sensor.remove({place: this._id}).exec();
    Controller.remove({place: this._id}).exec();
});

module.exports = mongoose.model('Place', PlaceSchema);
