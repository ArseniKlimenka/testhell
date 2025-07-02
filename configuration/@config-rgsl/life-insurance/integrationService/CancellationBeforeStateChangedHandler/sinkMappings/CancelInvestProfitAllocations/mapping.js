'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange) {

    if (input.amendmentState !== amendmentConstants.cancellationAmendmentState.Cancelled &&
         input.amendmentState !== amendmentConstants.cancellationAmendmentState.Rejected) {

        return;
    }

    return {
        request: {
            ReferenceNumber: input.amendmentNumber,
            ReferenceConfName: input.amendmentConfiguration
        }
    };
};
