'use strict';

exports.getErrorMessage = function (err) {
    var message = '';

    console.log(err);

    for (var errName in err.errors) {
        if (err.errors[errName].message) {
            message = err.errors[errName].message;
        }
    }

    return message;
};
