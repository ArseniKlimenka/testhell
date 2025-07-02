const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function linkNameMapping(input) {
    return getValue(input, 'context.Body.technicalInformation.originalDocumentNumber');
};
