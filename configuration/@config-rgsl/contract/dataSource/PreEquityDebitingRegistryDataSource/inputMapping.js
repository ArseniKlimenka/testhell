'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    const preEquityDebitingRegistryDate = criteria?.preEquityDebitingRegistryDate;

    if (!preEquityDebitingRegistryDate) {

        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    return output;
};
