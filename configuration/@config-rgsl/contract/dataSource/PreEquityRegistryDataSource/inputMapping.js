'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    const preEquityRegistryDate = criteria?.preEquityRegistryDate;

    if (!preEquityRegistryDate) {

        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
