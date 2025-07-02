'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const email = this.environmentVariables['rgsl.aggregatedPaymentImportNotification.email'];

    if (!email || email.length === 0) {

        return;
    }

    return {
        entityType: 'ImportDocument',
        dataContext: {
            content: {
                documentNumber: sinkExchange.documentNumber,
                documentUri: sinkExchange.documentUri
            }
        },
        recipients: {
            ContactInformation: [email]
        },
        throwOnError: false
    };
};
