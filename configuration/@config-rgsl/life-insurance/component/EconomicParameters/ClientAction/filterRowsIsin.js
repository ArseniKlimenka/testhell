'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsIsin(input) {

    return basicFilterByColumnName(input, 'isin');
};
