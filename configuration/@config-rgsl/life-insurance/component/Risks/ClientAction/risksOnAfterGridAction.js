const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function risksOnAfterGridAction(input, ambientProperties) {

    input.componentContext.sort((a, b) => getValue(a, 'risk.riskOrder', 0) - getValue(b, 'risk.riskOrder', 0));

};
