'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                deduplNumber: input.context.Code,
                isProcessed: "1",
                selectUniquePartyCodes: true
            }
        }
    });

    currentView.search();

};
