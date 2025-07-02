'use static';

const { claimStates, transitionNames } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}, sinkExchange) {

    const isPaid = body.claimAmounts.isPaid ?? false;
    let transitionName = undefined;

    if (state === claimStates.sentToPayment && isPaid) {

        transitionName = transitionNames.sentToPaymentToPaid;
    }

    if (transitionName) {

        return {
            businessNumber: number,
            transition: {
                transitionName: transitionName,
                configurationName: 'CollectiveClaim',
                configurationVersion: '1'
            }
        };
    }
};
