'use strict';

const { getUniversalConfigurationInfo } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = async function onCheckImportedConfigsDataTabEnter(input, ambientProperties) {

    getUniversalConfigurationInfo(input, ambientProperties, this, 'GetRateOfReturnRulesDataSource');

};
