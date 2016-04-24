'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ControllerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        unique: 'Controller name should be unique.',
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

ControllerSchema.plugin(require('mongoose-unique-validator'));
ControllerSchema.plugin(require('mongoose-deep-populate')(mongoose));

module.exports = mongoose.model('Controller', ControllerSchema);
