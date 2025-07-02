'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsInsuranceProduct(input) {

    return basicFilterByColumnName(input, 'insuranceProduct');
};
