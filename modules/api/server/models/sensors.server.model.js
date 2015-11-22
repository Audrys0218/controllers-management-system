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
    placeId:{
        type: Schema.Types.ObjectId,
        required: 'Place should be selected'
    },
    type: {
        type: String
    },
    communicationType: {
        type: String,
        default: 'file',
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
    }
});

mongoose.model('Sensor', SensorSchema);
