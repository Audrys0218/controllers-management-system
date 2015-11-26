'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RuleTriggerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    sensor: {
        type: Schema.Types.ObjectId,
        ref: 'Sensor',
        required: 'Sensor should be selected'
    },
    value: {
        type: Number,
        required: 'Value should be selected'
    },
    compareType: {
        type: String,
        required: 'compareType should be selected'
    }
});

var RuleOutcomeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    controller: {
        type: Schema.Types.ObjectId,
        ref: 'Controller',
        required: 'Controller should be selected'
    },
    value: {
        type: Number,
        required: 'Value should be selected'
    }
});

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
    },
    type: {
        type: String,
        default: '',
        trim: true,
        required: 'type cannot be blank'
    },
    triggers: [RuleTriggerSchema],
    outcomes: [RuleOutcomeSchema]
});

module.exports = mongoose.model('Rule', RuleSchema);
