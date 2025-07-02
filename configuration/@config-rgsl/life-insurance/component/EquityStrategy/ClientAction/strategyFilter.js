const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function strategyFilter(input, ambientProperties) {

    let result = input.items;

    const equityStrategies = getValue(input, 'rootContext.Body.equityStrategies') || [];

    result = result.filter(item => !equityStrategies.some(elem => elem.strategy.strategyCode == item.strategyCode));

    return result;

};
