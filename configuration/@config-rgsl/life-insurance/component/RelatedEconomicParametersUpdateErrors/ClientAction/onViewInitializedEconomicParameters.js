'use strict';

module.exports = function onViewInitializedEconomicParameters(input) {

    if (input.context.Number) {

        const currentView = this.getCurrentView();

        currentView.setSearchRequest({
            data: {
                criteria: {
                    relatedUniVersDocNumber: input.context.Number
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
