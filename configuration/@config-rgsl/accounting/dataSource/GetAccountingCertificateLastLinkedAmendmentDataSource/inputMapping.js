'use strict';

module.exports = function (input) {

    const errorMsg = 'Invalid input parameters!';
    const output = {};
    output.parameters = {};
    output.parameters.origDocNumber = null;

    if (!input || !input.data || !input.data.criteria || !input.data.criteria.origDocNumber) {
        throw errorMsg;
    }

    output.parameters.origDocNumber = input.data.criteria.origDocNumber;

    return output;
};
