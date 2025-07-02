'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function importDocumentUrlMapping(input) {

    const docNumber = input.rootContext.ClientViewModel.importDocumentNumber;

    if (!docNumber) {

        return;
    }

    return uriBuilder.getImportDocumentUri(docNumber, 'CollectiveClaimImport');
};
