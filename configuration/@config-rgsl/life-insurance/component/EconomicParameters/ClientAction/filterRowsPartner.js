'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsPartner(input) {

    return basicFilterByColumnName(input, 'partner');
};
