'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};

    if (input.data.criteria.requestNumber) {
        output.parameters.requestNumber = input.data.criteria.requestNumber;
    }

    if (input.data.criteria.requestState) {
        output.parameters.requestState = input.data.criteria.requestState;
    }

    if (input.data.criteria.requestType) {
        output.parameters.requestType = input.data.criteria.requestType;
    }

    if (input.data.criteria.requestAmendmentReason) {
        output.parameters.requestAmendmentReason = input.data.criteria.requestAmendmentReason;
    }

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.contractState) {
        output.parameters.contractState = input.data.criteria.contractState;
    }

    if (input.data.criteria.contractHolderCode) {
        output.parameters.contractHolderCode = input.data.criteria.contractHolderCode;
    }

    if (input.data.criteria.requestApplicantCode) {
        output.parameters.requestApplicantCode = input.data.criteria.requestApplicantCode;
    }

    if (input.data.criteria.product && input.data.criteria.product.productCode) {
        output.parameters.contractProductCode = input.data.criteria.product.productCode;
    }

    if (input.data.criteria.contractProductGroup) {
        output.parameters.contractProductGroup = input.data.criteria.contractProductGroup;
    }

    if (input.data.criteria.contractIssueDateFrom) {
        output.parameters.contractIssueDateFrom = input.data.criteria.contractIssueDateFrom;
    }

    if (input.data.criteria.contractIssueDateTo) {
        output.parameters.contractIssueDateTo = input.data.criteria.contractIssueDateTo;
    }

    if (input.data.criteria.contractStartDateFrom) {
        output.parameters.contractStartDateFrom = input.data.criteria.contractStartDateFrom;
    }

    if (input.data.criteria.contractStartDateTo) {
        output.parameters.contractStartDateTo = input.data.criteria.contractStartDateTo;
    }

    if (input.data.criteria.requestIssueDateFrom) {
        output.parameters.requestIssueDateFrom = input.data.criteria.requestIssueDateFrom;
    }

    if (input.data.criteria.requestIssueDateTo) {
        output.parameters.requestIssueDateTo = input.data.criteria.requestIssueDateTo;
    }

    if (input.data.criteria.contractAmount) {
        output.parameters.contractAmount = input.data.criteria.contractAmount;
    }

    return output;

};
