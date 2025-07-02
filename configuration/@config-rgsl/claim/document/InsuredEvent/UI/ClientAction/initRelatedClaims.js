'use strict';

module.exports = function initRelatedClaims(input) {

    const currentView = this.getCurrentView();

    if (!input.rootContext.Number) {

        return;
    }

    currentView.setSearchRequest({
        data: {
            criteria: {
                insuredEventNumber: input.rootContext.Number
            }
        }
    });

    currentView.search();
};
