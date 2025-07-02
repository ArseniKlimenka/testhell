'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsExpectedReturnPercentAK(input) {

    return basicFilterByColumnName(input, 'expectedReturnPercentAK');
};
