const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showForWithTarification(input, ambientProperties) {

    const withTarification = getValue(input, 'rootContext.Body.basicConditions.withTarification', false);

    return withTarification;
};
