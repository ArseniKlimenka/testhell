'use strict';

module.exports = function onChangeManualDocumentNumber(input) {

    const manualDocumentNumberWithPrefix = `-${input.componentContext.manualDocumentNumber}`;
    input.componentContext.externalDocumentNumber = manualDocumentNumberWithPrefix;
    input.rootContext.manualDocumentNumber = input.componentContext.manualDocumentNumber;
};
