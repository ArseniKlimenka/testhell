const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function hideLookUpInputs(input, ambientProperties) {

    return getValue(input, 'context.ClientViewModel.hidePartyLookUpSearchLookUpInputs', false);

};
