'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.endowmentState !== endowmentStates.cancelled && input.endowmentState !== endowmentStates.rejected) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.endowmentNumber,
            ReferenceConfName: "Endowment"
        }
    };
};
