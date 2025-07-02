"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.policyStartDate = dataSource.data[0].resultData.startDate;
    input.tempTechnicalData.policyEndDate = dataSource.data[0].resultData.endDate;
    input.tempTechnicalData.policyIssueDate = dataSource.data[0].resultData.issueDate;
};
