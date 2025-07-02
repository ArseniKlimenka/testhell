'use strict';

module.exports = function initImpStatFail(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { importDocumentId: input.context.Id } } });
    this.getCurrentView().search();
};
