const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function onChangeProductStyle(input) {

    const dataProperty = getValue(input, 'dataProperty');
    const checkResults = getValue(input, 'context.ClientViewModel.checkResults', []);

    return checkResults.some(item => item.dataProperty == dataProperty);

};
