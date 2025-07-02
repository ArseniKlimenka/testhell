'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;

    const contractNumber = body.contract?.number;
    const accountingYear = body.accountingYear?.year;
    const isManualCorrectionSum = body.paymentContract?.isManualCorrectionSum;

    if (contractNumber && accountingYear && !isManualCorrectionSum && !input.isContractEnrichOnly && !sinkExchange.isDuplicate) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber: contractNumber,
                        accountingYear: accountingYear
                    }
                }
            }
        };
    }
};
