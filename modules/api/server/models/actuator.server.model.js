'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActuatorSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        unique: 'Actuator name should be unique.',
        required: 'Title cannot be blank.',
        trim: true
    },
    microController: {
        type: Schema.Types.ObjectId,
        ref: 'MicroController',
        required: 'Microcontroller should be selected'
    },
    type: {
        type: String,
        trim: true,
        required: 'Type cannot be blank'
    },
    pinNumber: {
        type: Number,
        required: 'Pin number cannot be blank'
    },
    value: {
        type: Number,
        default: 0
    }
});

ActuatorSchema.plugin(require('mongoose-unique-validator'));
ActuatorSchema.plugin(require('mongoose-deep-populate')(mongoose));

module.exports = mongoose.model('Actuator', ActuatorSchema);
