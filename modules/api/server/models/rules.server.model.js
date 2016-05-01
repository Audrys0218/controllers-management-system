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
    actuator: {
        type: Schema.Types.ObjectId,
        ref: 'Actuator',
        required: 'Actuator should be selected'
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
        unique: 'Rule name should be unique.',
        required: 'Title cannot be blank.',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true,
        required: 'type cannot be blank'
    },
    priority: {
        type: Number,
        default: 0
    },
    enabled: {
        type: Boolean,
        default: true
    },
    triggers: [RuleTriggerSchema],
    outcomes: [RuleOutcomeSchema]
});


RuleSchema.plugin(require('mongoose-unique-validator'));

module.exports = mongoose.model('Rule', RuleSchema);
