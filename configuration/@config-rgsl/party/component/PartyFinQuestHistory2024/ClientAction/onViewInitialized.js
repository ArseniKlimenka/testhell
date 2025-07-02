'use strict';

module.exports = function onViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                partyCode: input.context.Code,
                finKnowledgeQuestionnaire2024: true
            },
            sort: [{
                fieldName: 'sysUpdatedOn',
                descending: true
            }]
        }
    });

    currentView.search();

};
