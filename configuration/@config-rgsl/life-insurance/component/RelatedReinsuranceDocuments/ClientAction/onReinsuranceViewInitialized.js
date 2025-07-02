'use strict';

module.exports = function onReinsuranceViewInitialized(input) {

    const currentView = this.getCurrentView();

    currentView.setSearchRequest({
        data: {
            criteria: {
                contractNumber: input.context.OriginalDocumentNumber,
                contractNumberByMaxVersion: true,
                sortByReinsuranceNumber: true
            }
        }
    });

    currentView.search();

};
