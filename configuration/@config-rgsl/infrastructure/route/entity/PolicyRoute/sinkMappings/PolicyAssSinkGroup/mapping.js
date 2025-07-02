'use strict';

module.exports = function mapping(input) {

    return {
        contractNumber: input.originalDocumentNumber,
        stateCode: input.state,
        policyData: {
            amendmentContractNumber: input.number,
            seqNumber: input.sequenceNumber,
            snapshotBody: input.body,
        },
    };
};
