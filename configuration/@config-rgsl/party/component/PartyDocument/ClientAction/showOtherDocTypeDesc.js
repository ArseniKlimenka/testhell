'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showOtherDocTypeDesc(input) {

    const docTypeCode = getValue(input, 'context.docType.docTypeCode');

    return docTypeCode == 'otherDocument';

};
