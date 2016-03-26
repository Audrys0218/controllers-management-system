'use strict';

exports.RestResponse = function (success, data, messages) {
    return {
        success: success,
        data: data,
        messages: messages
    };
};
