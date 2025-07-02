'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.rootContext.OriginalDocumentNumber || null
            },
            sort: [{
                fieldName: 'requestNumber',
                descending: true
            }]
        }
    });

    currentView.search();

};
