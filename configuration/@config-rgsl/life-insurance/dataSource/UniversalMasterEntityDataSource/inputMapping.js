'use strict';

module.exports = function (input) {

    const criteria = input.data.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    if (!criteria.universalMasterEntityCode && !criteria.contractNumber) {
        throw 'Invalid input parameters!';
    }

    const output = {
        parameters: {
            ...criteria,
        }
    };

    return output;
};
