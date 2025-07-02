const { attributeTypes } = require('@config-rgsl/life-insurance/lib/contractEntityAttributesImportHelper');

module.exports = function showPaymentIntermediateApplication(input) {

    return input.rootContext?.Body?.attributeType == attributeTypes.paymentIntermediateApplication;
};
