'use strict';

module.exports = function onVerificationViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                verificationNumber: input.context.Number || null,
            },
            sort: [{
                fieldName: 'createdDate',
                descending: true,
            }]
        }
    });

    currentView.search();

};
