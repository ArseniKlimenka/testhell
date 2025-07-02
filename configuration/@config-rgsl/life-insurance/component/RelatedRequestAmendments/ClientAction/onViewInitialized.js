'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentNumber: input.context.Body.contract.number || null,
                requestNumber: input.context.Number
            },
            sort: [{
                fieldName: 'createdOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
