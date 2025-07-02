'use strict';

const { getExistingRequestAttachmentsMapping, setMainRequestContext } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');
const { documentActions } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    setMainRequestContext(input, sinkExchange, documentActions.CreateNonFinancialAmendment, this);
    return getExistingRequestAttachmentsMapping(input, sinkExchange, additionalDataSourcesResults);

};
