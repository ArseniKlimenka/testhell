"use strict";

const { logLevels, logMessages } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.createdDocument = {};
    sinkExchange.createdDocument.Body = sinkResult.body;
    sinkExchange.createdDocument.Id = sinkResult.id;
    sinkExchange.createdDocument.Number = sinkResult.documentNumber;

    sinkExchange.logMessages.push({
        message: `${logMessages.certificateCreated} ${sinkResult.documentNumber}`,
        logLevel: logLevels.debug
    });
};
