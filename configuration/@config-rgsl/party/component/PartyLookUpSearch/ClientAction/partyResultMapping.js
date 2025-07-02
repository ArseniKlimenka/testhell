const { setValue, getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { participantType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const KPKHelper = require('@config-rgsl/party/lib/KPKHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function partyResultMapping(input, ambientProperties) {

    const dataProperty = input.dataProperty;
    const componentContext = input.componentContext;
    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;
    const data = input.data;

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        const canUseParty = await canUsePartyCheck(selected.metadata.code, input.rootContext, ambientProperties);
        if (!canUseParty) { return; }

        componentContext.partyId = selected.metadata.entityId;
        componentContext.partyCode = selected.metadata.code;
        componentContext.partyType = selected.metadata.configurationName;
        componentContext.partyFullName = selected.resultData.fullName;

    }

    if (componentContext.partyCode) {

        const partyRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetPartyDataSource',
            data: {
                data: {
                    criteria: {
                        partyCode: componentContext.partyCode
                    }
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(partyRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (result.data.length !== 0) {
            const party = result.data[0].resultData;
            const partyBody = party.body;

            componentContext.partyBody = partyBody;
            componentContext.dateOfBirth = partyBody.partyPersonData?.dateOfBirth;
            componentContext.personGender = partyBody.partyPersonData?.personGender;

            alignPolicyHolderAndInsured(body, data);
            this.view ? this.view.rebind() : null;
            this.view ? this.view.reevaluateRules() : null;
            this.view ? this.view.validate() : null;
        }
    }
    if (['AccumulatedLifeInsuranceQuote', 'InvestmentLifeInsuranceQuote', 'RiskLifeInsuranceQuote', 'EquityLifeInsuranceQuote'].includes(input.rootContext.ConfigurationCodeName)) {
        await onChangePerson(input, ambientProperties, this);
    }

    const eventArgs = {
        sender: {
            elementId: 'PartyLookUpSearch'
        }
    };
    ambientProperties.services.util.raiseEvent('PartyLookUpSearchSelected', eventArgs);

};

function alignPolicyHolderAndInsured(body, data) {
    if (data.participantType == participantType.policyHolder || data.participantType == participantType.insuredPerson) {
        const policyHolderPartyCode = getValue(body, 'policyHolder.partyData.partyCode');
        const insuredPersonPartyCode = getValue(body, 'insuredPerson.partyData.partyCode');
        const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');
        // copy one to another if isPolicyHolder
        if (isPolicyHolder && policyHolderPartyCode != insuredPersonPartyCode) {
            if (data.participantType == participantType.policyHolder) {
                setValue(body, 'insuredPerson.partyData', getValue(body, 'policyHolder.partyData'));
            }
            if (data.participantType == participantType.insuredPerson) {
                setValue(body, 'policyHolder.partyData', getValue(body, 'insuredPerson.partyData'));
            }
        }
        // set isPolicyHolder if was chosen the same
        if (!isPolicyHolder && policyHolderPartyCode == insuredPersonPartyCode) {
            setValue(body, 'insuredPerson.isPolicyHolder', true);
        }
    }
}

async function canUsePartyCheck(partyCode, rootContext, ambientProperties) {

    if (ambientProperties.configurationCodeName == 'Employee') {

        const request = {
            method: 'POST',
            url: 'api/entity-infrastructure/shared/datasource/ServiceProviderDataSource',
            data: {
                data: {
                    criteria: {
                        partyCode: partyCode,
                        serviceProviderType: 'Employee'
                    }
                }
            }
        };

        return ambientProperties.services.api
            .call(request)
            .then(result => {

                if (!result.data || result.data.length == 0) { return true; }

                const filteredData = result.data.filter(item => item.metadata.entityId != rootContext.Id);
                if (filteredData.length == 0) { return true; }

                const notificationMessage = 'Уже есть сотрудник связанный с выбранным контрагентом!';
                ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
                return false;

            });

    }

    return true;

}

async function onChangePerson(input, ambientProperties, self) {
    const partyBody = input.componentContext.partyBody;
    const document = {
        partyCode: input.componentContext.partyCode,
        partyId: input.componentContext.partyId,
        DocumentNumber: input.rootContext.Number,
        Representation: 'Договор ' + input.rootContext.Number,
        entityId: input.rootContext.Id,
        fullName: input.componentContext.partyFullName,
        productDescription: getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productDescription'),
        productCode: getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode')
    };
    if (input) {
        self.view.startBlockingUI();

        try {
            document.role = input.data.participantType == 'policyHolder' ? 'Клиент' : 'Иное';

            const contractorsResult = await KPKHelper.getContractors(partyBody, ambientProperties, document);
            let answer;
            if (contractorsResult.Error) {
                answer = 'Ошибка сервиса КПК. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru';
            }
            else if (contractorsResult.Reject || ['НаСогласовании', 'НеСогласован'].includes(contractorsResult.Agreement)) {
                answer = 'Проверка КПК не пройдена: ' + contractorsResult.Reason;
                await KPKHelper.setNaturalPersonPodFt(input.componentContext, ambientProperties);
            }

            if (answer) { ambientProperties.services.confirmationDialog.showConfirmation(answer, 'ОК', 'ОК', 2); }

            const blackListResult = await KPKHelper.checkBlackList(partyBody, ambientProperties, document);
            if (blackListResult.Error) {
                answer = 'Ошибка сервиса ЧС. Обратитесь в службу технической поддержки по адресу adinsure_support@rgsl.ru';
            }
            else if (blackListResult.Reject
                || blackListResult.Agreement.indexOf('Контрагент входит в ЧС. Идет согласование') != -1
                || blackListResult.Agreement.indexOf('Контрагент входит в ЧС. Действие запрещено') != -1) {
                answer = 'Проверка ЧС не пройдена: ' + blackListResult.Agreement;
            }

            if (answer) { ambientProperties.services.confirmationDialog.showConfirmation(answer, 'ОК', 'ОК', 2); }

        } catch (error) {
            self.view.stopBlockingUI();
            throw error;
        }

        self.view.stopBlockingUI();
    }
}
