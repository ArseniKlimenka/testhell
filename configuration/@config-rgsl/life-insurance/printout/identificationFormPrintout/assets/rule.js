'use strict';

module.exports = function appendixRule(input) {

    const appendix = [];

    // Анкета идентификации
    appendix.push({
        name: `MedLifePrintoutAssets/rehabIdentificationForm.pdf`,
        mode: 'Prepend'
    });

    return appendix;

};
