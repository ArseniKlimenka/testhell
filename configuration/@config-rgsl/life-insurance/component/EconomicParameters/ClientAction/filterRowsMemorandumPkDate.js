'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsMemorandumPkDate(input) {

    return basicFilterByColumnName(input, 'memorandumPkDate');
};
