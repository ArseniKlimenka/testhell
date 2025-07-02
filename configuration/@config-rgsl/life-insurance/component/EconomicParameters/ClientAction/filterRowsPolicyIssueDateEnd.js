'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsPolicyIssueDateEnd(input) {

    return basicFilterByColumnName(input, 'policyIssueDateEnd');
};
