"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0 || dataSource.data.length > 1) {

        return;
    }

    const body = this.businessContext.rootData;

    if (!body.tempTechnicalData) {

        body.tempTechnicalData = {};
    }

    body.tempTechnicalData.policyStartDate = dataSource.data[0].resultData.startDate;
    body.tempTechnicalData.policyEndDate = dataSource.data[0].resultData.endDate;
    body.tempTechnicalData.policyIssueDate = dataSource.data[0].resultData.issueDate;
};
