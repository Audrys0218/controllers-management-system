'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SensorSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        unique: 'Sensor name should be unique.',
        required: 'Title cannot be blank.',
        trim: true

    },
    microController: {
        type: Schema.Types.ObjectId,
        ref: 'MicroController',
        required: 'Micro controller should be selected'
    },
    type: {
        type: String,
        trim: true,
        required: 'Type cannot be blank.'
    },
    pinNumber: {
        type: String,
        required: 'Pin number cannot be blank'
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: false
    },
    value: {
        type: Number,
        default: -999
    }
});

SensorSchema.plugin(require('mongoose-unique-validator'));
SensorSchema.plugin(require('mongoose-deep-populate')(mongoose));

module.exports = mongoose.model('Sensor', SensorSchema);
