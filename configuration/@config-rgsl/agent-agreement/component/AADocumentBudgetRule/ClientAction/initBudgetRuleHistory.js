'use strict';

module.exports = function initBudgetRuleHistory(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                originalDocumentnumber: currentView.getParentView().getContext().OriginalDocumentNumber
            }
        }
    });

    currentView.search();
};
