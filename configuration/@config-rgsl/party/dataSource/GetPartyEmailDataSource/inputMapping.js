'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            applicationUserId: null
        }
    };

    if (input.data.criteria.applicationUserId) {

        output.parameters.applicationUserId = input.data.criteria.applicationUserId;
    }

    return output;

};
