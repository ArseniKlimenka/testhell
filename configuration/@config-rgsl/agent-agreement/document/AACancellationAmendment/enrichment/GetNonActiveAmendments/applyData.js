"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.nonActiveAmendments = dataSource.data.map(item => {

        return {
            amendmentNumber: item.resultData.amendmentNumber
        };
    });
};
