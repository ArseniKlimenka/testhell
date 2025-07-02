const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, dataSourceResponse) {

    input.duplicatesCount = getValue(dataSourceResponse, 'data.duplicatesCount', 0);

};
