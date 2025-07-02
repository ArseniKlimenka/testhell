'use strict';

module.exports = function onViewInitialized(input) {

    if (input.data.Number) {

        const currentView = this.getCurrentView();

        currentView.setSearchRequest({
            data: {
                criteria: {
                    anyMatchNumber: input.data.Number
                },
                sort: [{
                    fieldName: 'errorDate',
                    descending: true
                }]
            }
        });

        currentView.search();
    }

};
