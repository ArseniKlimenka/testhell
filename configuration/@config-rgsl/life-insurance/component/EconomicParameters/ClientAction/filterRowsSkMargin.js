'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsSkMargin(input) {

    return basicFilterByColumnName(input, 'skMargin');
};
