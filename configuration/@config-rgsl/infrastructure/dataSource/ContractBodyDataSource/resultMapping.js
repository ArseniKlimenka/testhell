'use strict';

module.exports = function resultMapping(input) {

    const dimensions = JSON.parse(input.DIMENSIONS);
    const dimensionsResult = {};
    if (dimensions) {
        for (const dimension of dimensions) {
            dimensionsResult[dimension.Key] = dimension.Value;
        }
    }

    const output = {
        contractNumber: input.CONTRACT_NUMBER,
        contractState: input.CONTRACT_STATE,
        amendmentContractNumber: input.AMENDMENT_CONTRACT_NUMBER,
        amendmentContractState: input.AMENDMENT_CONTRACT_STATE,
        seqNumber: input.SEQ_NUMBER,
        configurationCodeName: input.CONFIGURATION_CODE_NAME,
        snapshotBody: JSON.parse(input.SNAPSHOT_BODY),
        dimensions: dimensionsResult,
    };

    return output;
};
