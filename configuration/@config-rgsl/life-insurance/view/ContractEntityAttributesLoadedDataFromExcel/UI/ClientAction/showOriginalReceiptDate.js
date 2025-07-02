const { attributeTypes } = require('@config-rgsl/life-insurance/lib/contractEntityAttributesImportHelper');

module.exports = function showOriginalReceiptDate(input) {

    return input.rootContext?.Body?.attributeType == attributeTypes.originalReceiptDate;
};
