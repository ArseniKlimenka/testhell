"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.policyProduct = dataSource.data[0].resultData.productCode;
    input.tempTechnicalData.policyProductGroup = dataSource.data[0].resultData.productGroup;
};
