'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsFundingRateSwaps(input) {

    return basicFilterByColumnName(input, 'fundingRateSwaps');
};
