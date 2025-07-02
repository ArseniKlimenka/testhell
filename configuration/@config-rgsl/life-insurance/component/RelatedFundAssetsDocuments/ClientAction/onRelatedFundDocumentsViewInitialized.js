'use strict';

module.exports = function onRelatedFundDocumentsViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentNumber: input.context.OriginalDocumentNumber,
                isLatestReportDate: true
            }
        }
    });

    currentView.search();

};
