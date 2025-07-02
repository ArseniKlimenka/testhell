'use static';

const { claimStates, transitionNames } = require('@config-rgsl/claim-base/lib/claimConsts');
const { claimRisks } = require('@config-rgsl/claim-base/lib/ClaimRisks');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}, sinkExchange) {

    return {
        businessNumber: body.claimNumber,
        transition: {
            transitionName: 'StartImport',
            configurationName: 'CollectiveClaim',
            configurationVersion: '1'
        }
    };
};
