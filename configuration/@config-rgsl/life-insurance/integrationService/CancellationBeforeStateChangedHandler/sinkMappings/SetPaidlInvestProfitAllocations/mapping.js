'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange) {

    if (input.amendmentState !== amendmentConstants.cancellationAmendmentState.Paid) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.amendmentNumber,
            ReferenceConfName: input.amendmentConfiguration
        }
    };
};
