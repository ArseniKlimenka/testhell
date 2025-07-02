'use strict';

const { updateRequestFromAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    return updateRequestFromAmendmentMapping(input, sinkExchange, additionalDataSourcesResults);

};
