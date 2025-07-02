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

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.contractStateCode) {
        output.parameters.contractStateCode = input.data.criteria.contractStateCode;
    }

    if (input.data.criteria.product && input.data.criteria.product.productCode) {
        output.parameters.productCode = input.data.criteria.product.productCode;
    }

    if (input.data.criteria.productGroup) {
        output.parameters.productGroup = input.data.criteria.productGroup;
    }

    if (input.data.criteria.partner) {
        output.parameters.partner = input.data.criteria.partner;
    }

    if (input.data.criteria.amount) {
        output.parameters.amount = input.data.criteria.amount;
    }

    if (input.data.criteria.policyHolderCode) {
        output.parameters.policyHolderCode = input.data.criteria.policyHolderCode;
    }

    if (input.data.criteria.applicantCode) {
        output.parameters.applicantCode = input.data.criteria.applicantCode;
    }

    if (input.data.criteria.typeOfRequest) {
        output.parameters.typeOfRequest = input.data.criteria.typeOfRequest;
    }

    if (input.data.criteria.amendmentReason) {
        output.parameters.amendmentReason = input.data.criteria.amendmentReason;
    }

    if (input.data.criteria.requestIssueDateFrom) {
        output.parameters.requestIssueDateFrom = input.data.criteria.requestIssueDateFrom;
    }

    if (input.data.criteria.requestIssueDateTo) {
        output.parameters.requestIssueDateTo = input.data.criteria.requestIssueDateTo;
    }

    if (input.data.criteria.contractIssueDateFrom) {
        output.parameters.contractIssueDateFrom = input.data.criteria.contractIssueDateFrom;
    }

    if (input.data.criteria.contractIssueDateTo) {
        output.parameters.contractIssueDateTo = input.data.criteria.contractIssueDateTo;
    }

    return output;
};
