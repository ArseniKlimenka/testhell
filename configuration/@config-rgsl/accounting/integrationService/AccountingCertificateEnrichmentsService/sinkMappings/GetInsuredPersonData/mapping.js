'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;

    let partyCode = body.insuredPersonData?.partyCode;
    if (body.insuredPersonData?.isTaxPayerInsuredPerson || !partyCode) {
        partyCode = body?.contract?.parties?.insuredPerson?.personCode;
    }

    if (partyCode && !input.isContractEnrichOnly && !sinkExchange.isDuplicate) {

        return {
            input: {
                data: {
                    criteria: {
                        partyCode: partyCode
                    }
                }
            }
        };
    }
};
