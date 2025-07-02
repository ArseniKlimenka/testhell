const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showExpandedGrid(input, ambientProperties) {

    return getValue(input, 'context.Body.declarationMedicalConfirmation.isNotConfirmed', false);

};
