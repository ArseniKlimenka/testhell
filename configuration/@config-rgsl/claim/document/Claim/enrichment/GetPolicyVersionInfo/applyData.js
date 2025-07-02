"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    const versionResult = dataSource.data[0].resultData.versionResult;
    const riskResult = dataSource.data[0].resultData.riskResult;

    input.tempTechnicalData.policyVersionInfo = {
        latestSequenceNumber: versionResult.latestSequenceNumber,
        latestAppliedSequenceNumber: versionResult.latestAppliedSequenceNumber,
        latestNonDiscardedSequenceNumber: versionResult.latestNonDiscardedSequenceNumber,
        isDeathRisk: !!riskResult
    };
};


