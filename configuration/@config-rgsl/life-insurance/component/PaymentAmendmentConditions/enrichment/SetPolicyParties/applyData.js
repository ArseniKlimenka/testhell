"use strict";

module.exports = function mapping(input, result) {

    if (!result) {

        return;
    }

    if (result.errorResponse?.code) {

        throw `${result.errorResponse.message} ${result.errorResponse.additionalErrorData?.message}`;
    }

    const body = this.businessContext.rootData;

    if (!body.technicalData) {

        body.technicalData = {};
    }

    body.technicalData.policyParties = result.policyParties;
    body.technicalData.partiesInfo = result.partiesInfo;
};
