'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsInsurance(input) {

    return basicFilterByColumnName(input, 'insurance');
};
