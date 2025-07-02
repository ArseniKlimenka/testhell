'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsMotivationFromProductEconomic(input) {

    return basicFilterByColumnName(input, 'motivationFromProductEconomic');
};
