"use strict";

const { endowmentRisks } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.cancellationDate = dataSource.data[0].resultData.issueDate;
};
