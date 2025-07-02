'use strict';

module.exports = function (input) {

    if (!input?.data?.criteria) {
        throw "Input criteria was not defined!";
    }

    const criteria = input.data.criteria;

    if (!criteria.documentNumber) {
        throw "Criteria must have additional parameters!";
    }

    const output = {
        parameters: {
            ...criteria,
        }
    };

    return output;
};
