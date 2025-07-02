'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const relationInfo = sinkExchange.resolveContext('relationInfo');

    let contractNumber;
    let configurationCodeName;
    let body;

    if (relationInfo.mainStateCode !== 'Activated') {
        const contractInfo = sinkExchange.resolveContext('contractInfo');
        contractNumber = input.contractNumber;
        configurationCodeName = relationInfo.mainConfigurationName;
        body = contractInfo.body;
    } else {
        contractNumber = sinkExchange.resolveContext('createdAmendmentNumber');
        configurationCodeName = sinkExchange.resolveContext('createdAmendmentConfigurationCodeName');
        body = sinkExchange.resolveContext('createdAmendmentBody');
    }

    const result = {
        number: contractNumber,
        configuration: {
            name: configurationCodeName,
            version: '1',
        },
        body: body,
        enrichFields: [ '/commission[CalculateCommission]' ],
    };

    return result;
};
