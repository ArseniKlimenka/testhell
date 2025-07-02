'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    if (!criteria) {
        throw "Input criteria was not defined!";
    }

    const partnerCodes = criteria.partnerCodes;

    if (!partnerCodes || partnerCodes.length == 0) {
        throw 'No criteria provided!';
    }

    const output = {};

    output.parameters = {};
    output.parameters.partnerCodes = null;

    output.parameters.partnerCodes = partnerCodes;

    return output;
};
