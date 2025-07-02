'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.rootContext.Number || 'NONE'
            }
        }
    });

    currentView.search();

};
