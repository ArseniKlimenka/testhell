'use strict';

module.exports = function (input) {

    const output = {
        parameters: {}
    };

    if (input.data && input.data.criteria && input.data.criteria.currentDate) {

        output.parameters.currentDate = input.data.criteria.currentDate;
    }

    return output;
};
