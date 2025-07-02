'use strict';

const KPKHelper = require('@config-rgsl/party/lib/KPKHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { callDataSource } = require('@config-rgsl/infrastructure/lib/CommonUtils');
const { contractType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
 * @translationKey {translationKey} CheckKpkFail
 * @translationKey {translationKey} CheckKpkError
 */

async function checkContractors(input, ambientProperties, view) {

    const failMessage = "CheckKpkFail";
    const errorMessage = "CheckKpkError";
    const body = input.context.Body;
    const partyPersonData = body.partyPersonData;
    const partyOrganisationData = body.partyOrganisationData;
    const partyFullName = partyPersonData ?
        (partyPersonData?.lastName + " " + partyPersonData?.firstName + (partyPersonData?.middleName ? (" " + partyPersonData?.middleName) : "")) :
        partyOrganisationData.fullOrgName;

    const document = {
        role: "Клиент",
        entityId: input.rootContext.Id,
        DocumentNumber: input.rootContext.Code,
        Representation: "Контрагент " + input.rootContext.Code,
        fullName: partyFullName,
        partyId: input.rootContext.Id
    };

    view.startBlockingUI();
    let personIsPodFt = body.partyGeneralData.isPodFt ?? false;

    try {

        const contractorsResult = await KPKHelper.getContractors(body, ambientProperties, document);
        let answer;
        if (contractorsResult.Error) {

            answer = errorMessage;
        }
        else if (contractorsResult.Reject || ["НаСогласовании", "НеСогласован"].includes(contractorsResult.Agreement)) {
            answer = failMessage;
            personIsPodFt = true;
        } else {
            personIsPodFt = false;
        }

        if (answer) { ambientProperties.services.confirmationDialog.showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + `.${answer}`, 'ОК', 'ОК', 2); }

    } catch (error) {
        view.stopBlockingUI();
        throwResponseError(error);
    }

    if (body.partyGeneralData.isPodFt !== personIsPodFt) {

        input.rootContext.ClientViewModel.isNotificationNeedToSend = personIsPodFt && !body.partyGeneralData.isNotificationSent;

        body.partyGeneralData.isPodFt = personIsPodFt;
        body.partyGeneralData.isNotificationSent = personIsPodFt;
    }

    view.stopBlockingUI();
}

async function checkParty(partyCode, ambientProperties) {

    if (!partyCode || !ambientProperties) {
        return;
    }

    const request = {
        data: {
            criteria: {
                participant: partyCode,
                contractType: contractType.Policy
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

    const response = await callDataSource(ambientProperties, 'GeneralContractSearchDataSource', request);

    return response;
}

module.exports = {
    checkContractors,
    checkParty
};
