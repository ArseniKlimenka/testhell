const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showExpandedGrid(input, ambientProperties) {

    return getValue(input, 'context.Body.declarationSportConfirmation.isNotConfirmedSportPolicyHolder', false) ||
        getValue(input, 'context.Body.declarationSportConfirmation.isNotConfirmedSportInsuredPerson', false);

};
