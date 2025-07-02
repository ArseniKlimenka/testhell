'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showExpireDate(input, ambientProperties) {

    const documentsArray = this.getParentComponent() && this.getParentComponent().context || [];
    const rowContext = input.rowContext || {};

    const docTypeCode = getValue(rowContext, 'docType.docTypeCode');
    const docTypeCount = documentsArray
        .filter(function (item) { return getValue(item, 'docType.docTypeCode') == docTypeCode; })
        .length;

    return docTypeCount > 1;

};
