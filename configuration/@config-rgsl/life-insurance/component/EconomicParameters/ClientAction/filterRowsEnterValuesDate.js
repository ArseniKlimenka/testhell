'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsEnterValuesDate(input) {

    return basicFilterByColumnName(input, 'enterValuesDate');
};
