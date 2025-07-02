'use strict';

module.exports = function initRelatedPaymentOrders(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.rootContext.Number || ''
            }
        }
    });

    currentView.search();
};
