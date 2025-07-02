'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsInsuranceTermTo(input) {

    return basicFilterByColumnName(input, 'insuranceTermTo');
};
