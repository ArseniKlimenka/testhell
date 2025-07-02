'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

module.exports = function mapping(input, sinkExchange) {

    const claimNotificationUsers = this.environmentVariables["rgsl.groupEmails.claimNotificationUsers"]?.split(';').map(item => item.toLowerCase()) ?? [];

    if (!sinkExchange.claimNumber || !claimNotificationUsers.includes(sinkExchange.assigneeName)) {

        return;
    }

    const entityType = input.entityType;
    const claimNumber = sinkExchange.claimNumber;
    const clientBaseUrl = this.environmentVariables.clientBaseUrl;
    const claimUri = clientBaseUrl + '/' + uriBuilder.getClaimUri(claimNumber);

    const output = {
        entityType: entityType,
        dataContext: {
            content: {
                claimNumber: claimNumber,
                claimUri: claimUri
            }
        },
        recipients: {
            ContactInformation: sinkExchange.partyEmails ?? []
        }
    };

    return output;

};
