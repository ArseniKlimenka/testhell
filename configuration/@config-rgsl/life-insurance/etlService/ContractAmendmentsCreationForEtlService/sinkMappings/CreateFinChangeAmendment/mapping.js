'use strict';

const { createAutoConversionAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const configurationName = sinkExchange.contractData.configurationName;

    const mappingResult = createAutoConversionAmendmentMapping(
        input,
        sinkExchange,
        additionalDataSourcesResults,
        configurationName
    );

    mappingResult.relation = {
        relationName: amendmentConstants.financialChangeRelationsByBaseConfiguration[configurationName],
        configurationName: configurationName,
        configurationVersion: '1'
    };

    return mappingResult;
};
