'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;

    const productCode = criteria?.productCode;
    const strategyCode = criteria?.strategyCode;
    const purchaseDate = criteria?.purchaseDate;

    if (!productCode || !strategyCode || !purchaseDate) {

        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria
        }
    };

    return output;
};
