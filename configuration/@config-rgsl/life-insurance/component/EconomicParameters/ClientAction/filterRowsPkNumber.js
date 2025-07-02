'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsPkNumber(input) {

    return basicFilterByColumnName(input, 'pkNumber');
};
