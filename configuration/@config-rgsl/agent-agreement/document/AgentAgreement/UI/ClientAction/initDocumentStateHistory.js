'use strict';

module.exports = function initDocumentStateHistory(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                documentNumber: input.context.Number || ''
            }
        }
    });

    currentView.search();
};
