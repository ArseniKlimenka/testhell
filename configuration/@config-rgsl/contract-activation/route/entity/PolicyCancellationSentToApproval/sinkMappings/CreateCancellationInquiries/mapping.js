"use strict";
const { activities } = require('@adinsure/runtime');
const { cancellationAmendmentState } = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function mapping(input, sinkExchange) {

    const previousActivities = activities.getPreviousActivities('State', cancellationAmendmentState.OperationsApproval, input.id);
    const latestActivity = previousActivities[0];
    const request = [];

    request.push(getInquiryRequest(input, latestActivity, 'operationsDirector'));

    const recipients = input.body.paymentAmendmentConditions.canellationRecipients ?? [];
    const paticipantsData = sinkExchange.paticipantsData;
    let hasNonResident = false;

    recipients.forEach(item => {

        const paticipantData = paticipantsData.find(i => i.code === item.partyCode);

        if (paticipantData.isNonResident) {

            hasNonResident = true;
        }
    });

    if (hasNonResident) {

        request.push(getInquiryRequest(input, latestActivity, 'legal'));
        request.push(getInquiryRequest(input, latestActivity, 'compliance'));
    }

    return request;
};

function getInquiryRequest(input, latestActivity, groupName) {

    return {
        configurationName: 'CancellationInquiry',
        configurationVersion: "1",
        body: {
            configurationCodeName: input.configurationCodeName,
            department: {
                code: groupName,
                nameLocalized: translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', groupName)
            },
            textOfInquiry: 'Запрос создан автоматически',
            cancellationNumber: input.number,
            cancellationId: input.id,
            creatorUserName: latestActivity.assignedUsername,
            holder: input.body.technicalData.policyParties.holder.fullName
        },
        allowOnValidationErrors: {
            all: true
        },
        useSinkConfOverride: true,
        allowActiveDocumentsUpdate: false
    };
}
