'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                businessNumber: input.context.Number || null,
                businessNumberStrict: true
            },
            sort: [{
                fieldName: 'createdDate',
                descending: true
            }]
        }
    });

    currentView.search();

};
