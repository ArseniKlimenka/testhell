const KPKHelper = require("@config-rgsl/party/lib/KPKHelper");

module.exports = async function checkContractors(input, ambientProperties) {

    const partyData = input.componentContext.Body;
    const partyPersonData = partyData.partyPersonData;
    const partyOrganisationData = partyData.partyOrganisationData;
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

    this.view.startBlockingUI();
    try {

        const contractorsResult = await KPKHelper.getContractors(partyData, ambientProperties, document);
        let answer;
        if (contractorsResult.Error) {
            answer = "Ошибка сервиса КПК. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru";
        }
        else if (contractorsResult.Reject || ["НаСогласовании", "НеСогласован"].includes(contractorsResult.Agreement)) {
            answer = "Проверка КПК не пройдена: " + contractorsResult.Reason;
            partyData.partyGeneralData.isPodFt = true;
            this.view.save();
        } else {
            answer = "Проверка КПК пройдена.";
        }

        if (answer) { ambientProperties.services.confirmationDialog.showConfirmation(answer, 'ОК', 'ОК', 2); }

        const blackListResult = await KPKHelper.checkBlackList(partyData, ambientProperties, document);
        if (blackListResult.Error) {
            answer = "Ошибка сервиса ЧС. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru";
        }
        else if (blackListResult.Reject
            || blackListResult.Agreement.indexOf("Контрагент входит в ЧС. Идет согласование") != -1
            || blackListResult.Agreement.indexOf("Контрагент входит в ЧС. Действие запрещено") != -1) {
            answer = "Проверка ЧС не пройдена: " + blackListResult.Agreement;
        } else {
            answer = "Проверка ЧС пройдена.";
        }

        if (answer) { ambientProperties.services.confirmationDialog.showConfirmation(answer, 'ОК', 'ОК', 2); }

    } catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }

    this.view.stopBlockingUI();
};
