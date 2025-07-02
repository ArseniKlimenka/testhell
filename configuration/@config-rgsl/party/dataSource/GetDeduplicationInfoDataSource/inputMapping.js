'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.id = null;
    output.parameters.partyCode = null;
    output.parameters.deduplNumber = null;
    output.parameters.updateOrder = null;
    output.parameters.isProcessed = null;
    output.parameters.updatedDocuments = null;
    output.parameters.error = null;
    output.parameters.date = null;
    output.parameters.selectUniquePartyCodes = null;

    if (input.data.criteria.id) {
        output.parameters.id = input.data.criteria.id;
    }
    if (input.data.criteria.partyCode) {
        output.parameters.partyCode = input.data.criteria.partyCode;
    }
    if (input.data.criteria.deduplNumber) {
        output.parameters.deduplNumber = input.data.criteria.deduplNumber;
    }
    if (input.data.criteria.updateOrder) {
        output.parameters.updateOrder = input.data.criteria.updateOrder;
    }
    if (input.data.criteria.isProcessed) {
        output.parameters.isProcessed = input.data.criteria.isProcessed;
    }
    if (input.data.criteria.updatedDocuments) {
        output.parameters.updatedDocuments = input.data.criteria.updatedDocuments;
    }
    if (input.data.criteria.error) {
        output.parameters.error = input.data.criteria.error;
    }
    if (input.data.criteria.date) {
        output.parameters.date = input.data.criteria.date;
    }
    if (input.data.criteria.selectUniquePartyCodes) {
        output.parameters.selectUniquePartyCodes = input.data.criteria.selectUniquePartyCodes;
    }

    return output;

};
