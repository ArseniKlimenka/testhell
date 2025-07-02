'use strict';

module.exports = function mapping(input, sinkExchange) {

    const claimDocuments = input.claimDocuments;

    if (!claimDocuments || claimDocuments.length === 0) {

        return;
    }

    const requestCollection = claimDocuments.map(doc => {

        return {
            businessNumber: doc.number,
            transition: {
                transitionName: getTransitionName(doc.state),
                configurationName: 'Claim',
                configurationVersion: '1',
                skipIfNotAvailable: true
            }
        };
    });

    return requestCollection;
};

function getTransitionName(stateCode) {

    switch (stateCode) {
        case "ClaimDirectorApproval":
            return "ClaimDirectorApprovalToSentToPayment";
        case "MethodologyDirectorApproval":
            return "MethodologyDirectorApprovalToSentToPayment";
    }
}
