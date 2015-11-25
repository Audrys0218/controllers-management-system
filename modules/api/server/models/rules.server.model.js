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
    },
    type: {
        type: String,
        default: '',
        trim: true,
        required: 'type cannot be blank'
    },
    _triggers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RuleTrigger'
        }
    ],
    _outcomes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RuleOutcome'
        }
    ]
});

mongoose.model('Rule', RuleSchema);
