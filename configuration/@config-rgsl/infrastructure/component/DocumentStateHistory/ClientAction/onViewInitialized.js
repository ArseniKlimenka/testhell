'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                entityId: input.rootContext.Versions && input.rootContext.Versions[0] && input.rootContext.Versions[0].Id || input.rootContext.Id || null
            },
            sort: [{
                fieldName: 'changedOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
