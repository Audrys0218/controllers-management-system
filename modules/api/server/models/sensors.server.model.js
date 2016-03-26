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
        trim: true,
        required: 'Title cannot be blank'
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: 'Place should be selected'
    },
    type: {
        type: String,
        trim: true,
        required: 'Type cannot be blank'
    },
    communicationType: {
        type: String,
        trim: true,
        required: 'Communication type cannot be blank'
    },
    communicationPath: {
        type: String,
        trim: true
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

module.exports = mongoose.model('Sensor', SensorSchema);
