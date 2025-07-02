'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.documentTypeCode = input.DOCUMENT_TYPE_CODE;
    output.viewCode = input.CODE_VIEW;

    return output;
};
