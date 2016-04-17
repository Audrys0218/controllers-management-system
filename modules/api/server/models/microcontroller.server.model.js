'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MicroControllerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        unique: 'Micro controller name should be unique.',
        required: 'Title cannot be blank.',
        trim: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: 'Place should be selected'
    },
    ip: {
        type: String,
        trim: true,
        required: 'Ip adress is required'
    }
});

MicroControllerSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('MicroController', MicroControllerSchema);
