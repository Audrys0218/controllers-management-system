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
    value: {
        type: Number,
        default: 0
    }
});

ControllerSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Controller', ControllerSchema);
