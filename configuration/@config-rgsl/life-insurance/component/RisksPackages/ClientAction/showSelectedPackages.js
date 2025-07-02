const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showSelectedPackages(input, ambientProperties) {
    return getValue(input, 'context.Body.risksPackages.availablePackages', []).length > 0;
};
