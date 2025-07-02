'use strict';

const { highlightErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;

    if (body.taxPayerData?.isTaxPayerPolicyHolder == undefined) {
        const errorMsg = `E: ${body.contract.number} пустое значение в столбце Плательщик совпадает со страхователем`;
        throw new Error(highlightErrorMessage(errorMsg));
    }

    let partyCode = body.taxPayerData?.partyCode;
    if (body.taxPayerData?.isTaxPayerPolicyHolder || !partyCode) {
        partyCode = body?.contract?.parties?.holder?.personCode;
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
