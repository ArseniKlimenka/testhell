"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.duplicates = dataSource.data.map(item => item.resultData.claimNumber);
    input.tempTechnicalData.duplicates = input.tempTechnicalData.duplicates
        .filter(item => item !== this.businessContext.documentNumber);
};
