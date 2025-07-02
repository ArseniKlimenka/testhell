'use strict';

const { getKPKRequestData } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function (input, sinkExchange) {

    const docNumber = sinkExchange.endowment.universalDocumentNumber;
    const docId = sinkExchange.endowment.universalDocumentId;

    const partiesData = sinkExchange.paticipantsData ?? [];


    const body = {
        tempTechnicalData: {
            policyParties: sinkExchange.policyParties,
            policyEndDate: sinkExchange.endowment.body.tempTechnicalData?.policyEndDate,
            policyIssueDate: sinkExchange.endowment.body.tempTechnicalData?.policyIssueDate,
        },
        mainAttributes: {
            applicationInfo: {
                statementReceivedDate: sinkExchange.endowment.body.mainAttributes?.applicationInfo?.statementReceivedDate,
            }
        }
    };

    const kpkRequestData = getKPKRequestData(body, partiesData, docId, docNumber);

    return {
        input: {
            data: kpkRequestData,
        }
    };
};
