'use strict';

module.exports = function initClaimStateHistory(input) {

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
