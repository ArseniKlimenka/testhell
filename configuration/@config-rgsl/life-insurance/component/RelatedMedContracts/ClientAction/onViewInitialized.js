'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.context.Number || null
            },
            sort: [{
                fieldName: 'createdOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
