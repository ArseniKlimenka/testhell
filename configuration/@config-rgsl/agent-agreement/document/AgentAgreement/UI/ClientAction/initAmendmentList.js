'use strict';

module.exports = function initAmendmentList(input) {

    const currentView = this.getCurrentView();
    const versions = input.context.Versions ?? [];
    const baseVersionId = versions[0]?.Id;

    if (!baseVersionId) {

        return;
    }

    currentView.setSearchRequest({
        data: {
            criteria: {
                originalDocumentId:  baseVersionId
            }
        }
    });

    currentView.search();
};
