'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsCommRate(input) {

    return basicFilterByColumnName(input, 'commRate');
};
