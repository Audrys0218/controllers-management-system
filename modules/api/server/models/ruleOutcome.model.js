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

mongoose.model('RuleOutcome', RuleTriggerSchema);
