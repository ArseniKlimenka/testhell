'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractId: input.rootContext.Id || null
            },
            sort: [{
                fieldName: 'sysCreatedOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
