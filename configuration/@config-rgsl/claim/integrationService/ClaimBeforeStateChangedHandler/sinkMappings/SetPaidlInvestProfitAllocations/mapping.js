'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.claimState !== claimStates.paid) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.claimNumber,
            ReferenceConfName: "Claim"
        }
    };
};
