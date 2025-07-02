'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsStrategyDescription(input) {

    return basicFilterByColumnName(input, 'basicInvestmentParameters');
};
