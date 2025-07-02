'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsOptionPrice(input) {

    return basicFilterByColumnName(input, 'optionPrice');
};
