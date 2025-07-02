"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.policyOpenAmounts = dataSource.data.map(item => {

        return {
            openAmount: item.resultData.openAmount,
            dueDate: item.resultData.dueDate,
            periodNumber: item.resultData.periodNumber
        };
    });
};
