const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showCopyOf(input) {
    return Boolean(getValue(input, 'context.Body.technicalInformation.originalDocumentNumber'));
};
