"use strict";
const { activities } = require('@adinsure/runtime');
const { endowmentStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function mapping(input, sinkExchange) {

    const previousActivities = activities.getPreviousActivities('State', endowmentStates.operationsApproval, input.id);
    const latestActivity = previousActivities[0];

    const request = [
        {
            configurationName: 'EndowmentInquiry',
            configurationVersion: "1",
            body: {
                department: {
                    code: 'operationsDirector',
                    nameLocalized: translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', 'operationsDirector')
                },
                textOfInquiry: 'Запрос создан автоматически',
                endowmentNumber: input.number,
                endowmentId: input.id,
                creatorUserName: latestActivity.assignedUsername,
                holder: input.body.technicalData.policyInfo.policyHolder.name,
                contractNumber: input.body.mainAttributes?.contract?.number,
                contractConfigurationCodeName: input.body.mainAttributes?.contract?.configurationName
            },
            allowOnValidationErrors: {
                all: true
            },
            useSinkConfOverride: true,
            allowActiveDocumentsUpdate: false
        }
    ];

    const beneficiaries = input.body.endowmentBeneficiaries ?? [];
    const paticipantsData = sinkExchange.paticipantsData;
    let hasNonResident = false;

    beneficiaries.forEach(item => {

        const paticipantData = paticipantsData.find(i => i.resultData.code === item.partyCode);

        if (paticipantData.resultData.isNonResident) {

            hasNonResident = true;
        }
    });

    if (hasNonResident) {

        request.push(
            {
                configurationName: 'EndowmentInquiry',
                configurationVersion: "1",
                body: {
                    department: {
                        code: 'legal',
                        nameLocalized: translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', 'legal')
                    },
                    textOfInquiry: 'Запрос создан автоматически',
                    endowmentNumber: input.number,
                    endowmentId: input.id,
                    creatorUserName: latestActivity.assignedUsername,
                    holder: input.body.technicalData.policyInfo.policyHolder.name,
                    contractNumber: input.body.mainAttributes?.contract?.number,
                    contractConfigurationCodeName: input.body.mainAttributes?.contract?.configurationName
                },
                allowOnValidationErrors: {
                    all: true
                },
                useSinkConfOverride: true,
                allowActiveDocumentsUpdate: false
            }
        );
    }

    return request;
};
