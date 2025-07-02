const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showExpandedGrid(input, ambientProperties) {

    return getValue(input, 'context.Body.declarationMainConfirmation.isNotConfirmedPolicyHolder', false) ||
        getValue(input, 'context.Body.declarationMainConfirmation.isNotConfirmedInsuredPerson', false);

};
