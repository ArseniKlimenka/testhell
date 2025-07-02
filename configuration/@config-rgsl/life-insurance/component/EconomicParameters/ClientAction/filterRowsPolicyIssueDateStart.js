'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsPolicyIssueDateStart(input) {

    return basicFilterByColumnName(input, 'policyIssueDateStart');
};
