'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsInsuranceTermFrom(input) {

    return basicFilterByColumnName(input, 'insuranceTermFrom');
};
