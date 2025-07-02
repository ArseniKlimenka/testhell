'use strict';

module.exports = function initLoadedDataFromExcel(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { importDocumentId: input.context.Id } } });
    this.getCurrentView().search();
};
