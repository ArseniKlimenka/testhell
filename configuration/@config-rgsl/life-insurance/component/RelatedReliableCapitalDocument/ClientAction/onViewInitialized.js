'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();
    const policyNumber = input.additionalContext?.technicalInformation?.createdFromPolicy;
    const policyOriginalNumber = input.additionalContext?.technicalInformation?.createdFromPolicyOriginal;

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: policyNumber ? policyOriginalNumber : policyNumber ?? 'NONE',
                seqNumber: 0
            },
            sort: [{
                fieldName: 'createdOn',
                descending: true
            }]
        }
    });

    currentView.search();
};
