'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentId: input.rootContext.Id || null
            },
            sort: [{
                fieldName: 'createdOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
