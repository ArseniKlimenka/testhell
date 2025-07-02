const { attributeTypes } = require('@config-rgsl/life-insurance/lib/contractEntityAttributesImportHelper');

module.exports = function showHasAmendment(input) {

    return input.rootContext?.Body?.attributeType == attributeTypes.hasAmendment;
};
