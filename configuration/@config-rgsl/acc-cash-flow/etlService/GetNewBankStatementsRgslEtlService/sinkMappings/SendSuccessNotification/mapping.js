'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const email = this.environmentVariables['rgsl.bankStatementImportNotification.email'];

    if (sinkExchange.globalContext.shouldSendErrorEmail || !email || email.length === 0) {

        return;
    }

    return {
        entityType: 'ImportDocument',
        dataContext: {
            content: {
                executionStatusId: this.businessContext.executionStatusId
            }
        },
        recipients: {
            ContactInformation: [email]
        },
        throwOnError: false
    };
};
