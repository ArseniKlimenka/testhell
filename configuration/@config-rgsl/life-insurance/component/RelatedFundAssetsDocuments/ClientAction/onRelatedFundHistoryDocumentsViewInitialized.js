'use strict';

module.exports = function onRelatedFundHistoryDocumentsViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentNumber: input.context.OriginalDocumentNumber
            }
        }
    });

    currentView.search();

};
