'use strict';

module.exports = function (input) {

    if (!input?.data?.criteria?.contractNumber || input?.data?.criteria?.contractNumber.length === 0) {
        throw 'Необходимо указать Номер договора!';
    }

    const output = {};

    output.parameters = {};

    if (input.data.criteria.requestId) {
        output.parameters.requestId = input.data.criteria.requestId;
    }

    if (input.data.criteria.requestNumber) {
        output.parameters.requestNumber = input.data.criteria.requestNumber;
    }

    if (input.data.criteria.excludeRequestNumber) {
        output.parameters.excludeRequestNumber = input.data.criteria.excludeRequestNumber;
    }

    if (input.data.criteria.requestState) {
        output.parameters.requestState = input.data.criteria.requestState;
    }

    if (input.data.criteria.typeOfRequest) {
        output.parameters.typeOfRequest = input.data.criteria.typeOfRequest;
    }

    if (input.data.criteria.amendmentReason) {
        output.parameters.amendmentReason = input.data.criteria.amendmentReason;
    }

    if (input.data.criteria.contractNumber) {
        output.parameters.contractNumber = input.data.criteria.contractNumber;
    }

    if (input.data.criteria.isDidPayment) {
        output.parameters.isDidPayment = input.data.criteria.isDidPayment;
    }

    return output;
};
