'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.universalMasterEntityCode = null;

    const criteria = input.data.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    if (!criteria.universalMasterEntityCode) {
        throw 'Invalid input parameters!';
    }

    if (criteria.universalMasterEntityCode) {
        output.parameters.universalMasterEntityCode = criteria.universalMasterEntityCode;
    }

    output.sort = {
        LOAD_DATE: 'DESC'
    };

    return output;
};
