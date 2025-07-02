'use strict';

module.exports = function onInvestmentProfitViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.context.OriginalDocumentNumber,
                contractNumberByMaxVersion: true
            }
        }
    });

    currentView.search();

};
