'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;

    const contractNumber = body.contract?.number;
    const accountingYear = body.accountingYear?.year;
    const insuredPartyCode = body.insuredPersonData?.partyCode ?? body.insuredPerson?.personCode;
    const accountingCertificateSeqNumber = input.sequenceNumber.toString();
    if (!input.isContractEnrichOnly && contractNumber && accountingYear && insuredPartyCode) {

        return {
            input: {
                data: {
                    criteria: {
                        contractNumber,
                        accountingYear,
                        insuredPartyCode,
                        accountingCertificateSeqNumber
                    }
                }
            }
        };
    }
};
