'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsRiskTransferProduct(input) {

    return basicFilterByColumnName(input, 'riskTransferProduct');
};
