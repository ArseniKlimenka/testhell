'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsShareRF(input) {

    return basicFilterByColumnName(input, 'shareRF');
};
