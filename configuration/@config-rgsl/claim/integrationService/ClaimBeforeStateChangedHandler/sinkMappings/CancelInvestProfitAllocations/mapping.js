'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.claimState !== claimStates.cancelled &&
        input.claimState !== claimStates.rejected &&
        input.claimState !== claimStates.rejectedByCommonReasons) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.claimNumber,
            ReferenceConfName: "Claim"
        }
    };
};
