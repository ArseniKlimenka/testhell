'use strict';

module.exports = function (input) {

    const criteria = input?.data?.criteria;
    if (!criteria) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            originalDocumentId: undefined,
            contractNumber: undefined,
            contractNumberStrict: undefined,
            contractNumbersStrict: undefined,
            seqNumber: undefined,
            seqNumberMax: undefined,
            policyOnly: undefined,
            versionState: undefined,
            versionStateWithNull: undefined,
            stateId: undefined
        }
    };

    output.parameters.originalDocumentId = criteria.originalDocumentId;
    output.parameters.contractNumber = criteria.contractNumber;
    output.parameters.contractNumberStrict = criteria.contractNumberStrict;
    output.parameters.contractNumbersStrict = criteria.contractNumbersStrict;
    output.parameters.seqNumber = criteria.seqNumber;
    output.parameters.seqNumberMax = criteria.seqNumberMax;
    output.parameters.policyOnly = criteria.policyOnly;
    output.parameters.versionState = criteria.versionState;
    output.parameters.versionStateWithNull = criteria.versionStateWithNull;
    output.parameters.stateId = criteria.stateId;

    if (output.parameters.seqNumberMax && !output.parameters.versionState) {

        if (!output.parameters.contractNumber) {
            throw 'Parameter contractNumber should be provided!';
        }
    }

    if (!output.parameters.originalDocumentId &&
        !output.parameters.contractNumber &&
        !output.parameters.contractNumberStrict &&
        !output.parameters.contractNumbersStrict &&
        !output.parameters.seqNumber) {
        throw 'No criteria provided!';
    }

    return output;

};
