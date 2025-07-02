'use strict';

module.exports = function initRelatedBokOutgoingPayment(input) {

    const currentView = this.getCurrentView();
    const number = input.rootContext.Number;
    if (!number) { return; }

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: number,
            }
        }
    });

    currentView.search();
};
