'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsAnalyticalAdjustment(input) {

    return basicFilterByColumnName(input, 'analyticalAdjustment');
};
