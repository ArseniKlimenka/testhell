'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsRateOfReturn(input) {

    return basicFilterByColumnName(input, 'ratesOfReturn');
};
