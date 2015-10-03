'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleSchema = new Schema({
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

mongoose.model('Rule', RuleSchema);
