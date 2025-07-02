'use strict';

module.exports = function getAANumber(input) {

    const number = input.rootContext.Number ?? '';
    const numberToDisplay = input.componentContext.manualDocumentNumber ?? number;

    return numberToDisplay;
};
