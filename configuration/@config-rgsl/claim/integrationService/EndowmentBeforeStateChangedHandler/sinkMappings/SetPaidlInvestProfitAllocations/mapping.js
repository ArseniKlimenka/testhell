'use strict';

const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping(input, sinkExchange) {

    if (input.endowmentState !== endowmentStates.paid) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.endowmentNumber,
            ReferenceConfName: "Endowment"
        }
    };
};
