'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.recommendationDate = null;
    output.parameters.getAllStrategies = null;

    const criteria = input?.data?.criteria;
    const productCode = criteria?.productCode;
    const recommendationDate = criteria?.recommendationDate;
    const getAllStrategies = criteria?.getAllStrategies;

    if (!getAllStrategies && (!productCode || !recommendationDate)) {
        throw "Input criteria was not defined!";
    }

    output.parameters.productCode = productCode;
    output.parameters.recommendationDate = recommendationDate;
    output.parameters.getAllStrategies = getAllStrategies;

    return output;

};
