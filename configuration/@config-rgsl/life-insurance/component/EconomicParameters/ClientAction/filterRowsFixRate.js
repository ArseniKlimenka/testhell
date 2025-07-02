'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsFixRate(input) {

    return basicFilterByColumnName(input, 'fixRate');
};
