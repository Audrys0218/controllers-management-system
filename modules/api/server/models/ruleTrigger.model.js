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
    rule: {
        type: Schema.Types.ObjectId,
        ref: 'Rule',
        required: 'Rule should be selected'
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

mongoose.model('RuleTrigger', RuleTriggerSchema);
