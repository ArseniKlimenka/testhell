'use strict';

module.exports = function initImpStatFail(input) {
    const {
        context
    } = input;

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                importDocumentId: (context.Id || '')
            }
        }
    });

    this.getCurrentView().search();
};
