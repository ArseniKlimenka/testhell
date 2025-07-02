'use strict';

module.exports = function mapping(sinkInput) {

    return {
        request: {
            ContractNumber: sinkInput.contractNumber,
            Body: sinkInput.body,
            CommonBody: sinkInput.commonBody,
            SnapshotBody: sinkInput.snapshotBody
        }
    };
};
