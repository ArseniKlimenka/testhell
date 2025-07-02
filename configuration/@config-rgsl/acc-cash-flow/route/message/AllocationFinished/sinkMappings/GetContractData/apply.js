'use strict';

const { partyDocumentType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const contractData = sinkResult.data.map(_ => _.resultData)[0];

    sinkExchange.logMessages.push({
        message: `Documents found: ${JSON.stringify(contractData.body.policyHolder.partyData.partyBody.partyDocuments)}`,
        logLevel: 'debug'
    });

    if (contractData.body.policyHolder.partyData.partyBody.partyDocuments
        .find(x => x.docType.docTypeClass === 'identity'
            && x.docType.docTypeCode !== partyDocumentType.foreignCitPassport)) {

        sinkExchange.logMessages.push({
            message: 'ForeignCit passport not found',
            logLevel: 'debug'
        });
        sinkExchange.isSkippingRoute = true;
    }

    sinkExchange.contractData = contractData;
};
