'use strict';

module.exports = function initImpStatSucc(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { importDocumentId: input.context.Id } } });
    this.getCurrentView().search();
};
