'use strict';

module.exports = function initImpStatSucc(input) {
    const {
        context
    } = input;

    this.getCurrentView().setSearchRequest({
        data: {
            criteria: {
                importDocumentId: (context.Id || '')
            },
            sort: [
                {
                    fieldName: 'recordKeyInt',
                    descending: false
                }
            ]
        }
    });

    this.getCurrentView().search();
};
