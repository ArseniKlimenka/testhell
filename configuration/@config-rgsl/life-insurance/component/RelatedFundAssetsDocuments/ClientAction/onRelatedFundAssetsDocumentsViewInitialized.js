'use strict';

module.exports = function onRelatedFundAssetsDocumentsViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentNumber: input.context.OriginalDocumentNumber,
                isRelatedToFundReportDate: true
            }
        }
    });

    currentView.search();

};
