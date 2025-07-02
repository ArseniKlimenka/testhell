"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.nettedDocumentsData = dataSource.data.map(item => {

        return {
            contractNumber: item.resultData.contractNumber,
            openAmount: item.resultData.openAmount
        };
    });
};
