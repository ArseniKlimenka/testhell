'use strict';

module.exports = function onViewInitialized(input) {

    const { context } = input;

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                importDocumentId: context.Id || ''
            }
        }
    });

    this.getCurrentView().search();
};
