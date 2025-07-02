'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsRvd(input) {

    return basicFilterByColumnName(input, 'rvd');
};
