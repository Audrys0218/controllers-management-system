'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Actuator = require(path.resolve('./modules/api/server/models/actuator.server.model')),
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
        unique: 'Place name should be unique.',
        required: 'Title cannot be blank.',
        trim: true
    }
});

PlaceSchema.post('remove', function () {
    Sensor.remove({place: this._id}).exec();
    Actuator.remove({place: this._id}).exec();
});

PlaceSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Place', PlaceSchema);
