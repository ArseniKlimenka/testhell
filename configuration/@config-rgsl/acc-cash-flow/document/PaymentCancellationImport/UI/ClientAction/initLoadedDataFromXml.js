module.exports = function initLoadedDataFromXml(input) {
    this.getCurrentView().setSearchRequest({ data: { criteria: { importDocumentId: input.context.Id } } });
    this.getCurrentView().search();
};
