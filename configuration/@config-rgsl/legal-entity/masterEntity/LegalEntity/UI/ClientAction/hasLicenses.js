const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function hasLicenses (input) {

    return getValue(input, 'context.Body.partyLicensesAdditionalInfo.hasLicenses', false);
};
