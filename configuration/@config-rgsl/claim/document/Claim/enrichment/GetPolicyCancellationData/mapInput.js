'use strict';

const { amendmentType, amendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes?.contract?.number;

    if (!contractNumber) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                amendmentType: amendmentType.Cancellation,
                amendmentState: amendmentState.Active,
            }
        }
    };
};
