'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsHedge(input) {

    return basicFilterByColumnName(input, 'hedge');
};
