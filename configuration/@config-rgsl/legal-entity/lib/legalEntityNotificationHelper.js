'use strict';

const { translationUtils } = require('@adinsure/runtime');
const FormatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");

function getLegalEntityData(messageContext, sharedContext, notificationContext) {

    const recipientsString = notificationContext.environmentVariables["rgsl.groupEmails.legalEntityCreated"];
    const recipientsArray = recipientsString && recipientsString.split(';');

    return {
        recipientsString,
        recipientsArray
    };
}

function getLegalEntityNotificationOutput(messageContext, sharedContext, notificationContext, continueNotificationData) {

    const partyType = sharedContext.partyType;
    const partyCode = sharedContext.partyCode;
    const clientBaseUrl = notificationContext.environmentVariables.clientBaseUrl;
    const partyUri = clientBaseUrl + '/' + uriBuilder.getPartyUri(partyType, partyCode);
    const partyFullName = sharedContext.commonBody.fullName;
    const partyFullNameForEmailTitle = partyFullName.replace(/"/g, '').replace(/'/g, '');

    return {
        entityType: sharedContext.partyType,
        dataContext: {
            content: {
                partyUri: partyUri,
                partyFullName: partyFullName,
                partyFullNameForEmailTitle: partyFullNameForEmailTitle
            }
        },
        recipients: {
            ContactInformation: continueNotificationData.recipientsArray
        }
    };

}

module.exports = {
    getLegalEntityData,
    getLegalEntityNotificationOutput
};
