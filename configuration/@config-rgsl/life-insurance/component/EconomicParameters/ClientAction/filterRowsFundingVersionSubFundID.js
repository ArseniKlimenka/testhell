'use strict';

const { basicFilterByColumnName } = require('@config-rgsl/life-insurance/lib/filterHelper');

module.exports = function filterRowsFundingVersionSubFundID(input) {

    return basicFilterByColumnName(input, 'fundingVersionSubFundID');
};
