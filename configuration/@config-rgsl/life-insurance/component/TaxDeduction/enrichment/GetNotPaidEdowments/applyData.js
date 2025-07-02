"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    const body = this.businessContext.rootData;

    if (!body.tempTechnicalData) {

        body.tempTechnicalData = {};
    }

    body.tempTechnicalData.notPaidEndowments = dataSource.data.map(i => i.resultData.endowmentNumber);
};
