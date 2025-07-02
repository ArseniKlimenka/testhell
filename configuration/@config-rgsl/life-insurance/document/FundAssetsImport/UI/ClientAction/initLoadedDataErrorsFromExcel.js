'use strict';

module.exports = function initLoadedDataErrorsFromExcel(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { importDocumentId: input.context.Id } } });
    this.getCurrentView().search();
};
