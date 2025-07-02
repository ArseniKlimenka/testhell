'use strict';

const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { participantType } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const KPKHelper = require('@config-rgsl/party/lib/KPKHelper');
const { copyInsuredDataToBeneficiary } = require('@config-rgsl/life-insurance/lib/uiHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function partyResultMapping(input, ambientProperties) {

    const dataProperty = input.dataProperty;
    input.componentContext = input.componentContext || {};
    const componentContext = input.componentContext;
    const lookupSelection = input.getLookupSelection();
    const body = input.context.Body;
    const data = input.data;

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        const canUseParty = await canUsePartyCheck(this, selected.metadata.code, input.rootContext, ambientProperties);
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

            componentContext.partyBody = party.body;
            componentContext.dateOfBirth = party.body.partyPersonData?.dateOfBirth;
            componentContext.personGender = party.body.partyPersonData?.personGender;
            setValue(data, dataProperty, componentContext);
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

    // set beneficiary
    await copyInsuredDataToBeneficiary(this);

};

function alignPolicyHolderAndInsured(body, data) {

    if (data.participantType == participantType.policyHolder || data.participantType == participantType.insuredPerson) {

        const policyHolderPartyCode = body?.policyHolder?.partyData?.partyCode;
        const insuredPersonPartyCode = body?.insuredPerson?.partyData?.partyCode;

        const issueFormCode = body?.issueForm?.code?.issueFormCode;
        const isEPolicy = issueFormCode == 'ePolicy';

        const insuredIsPolicyHolder = body?.productConfiguration?.insuredIsPolicyHolder;

        // set isPolicyHolder if was chosen the same
        if (policyHolderPartyCode == insuredPersonPartyCode) {

            setValue(body, 'insuredPerson.isPolicyHolder', true);
        }
        else if (!isEPolicy && !insuredIsPolicyHolder) {

            setValue(body, 'insuredPerson.isPolicyHolder', false);
        }

        const isPolicyHolder = body?.insuredPerson?.isPolicyHolder;

        // copy one to another if isPolicyHolder
        if (isPolicyHolder && policyHolderPartyCode != insuredPersonPartyCode) {

            if (data.participantType == participantType.policyHolder) {

                setValue(body, 'insuredPerson.partyData', body?.policyHolder?.partyData);
            }

            if (data.participantType == participantType.insuredPerson) {

                setValue(body, 'policyHolder.partyData', body?.insuredPerson?.partyData);
            }
        }
    }
}

async function canUsePartyCheck(self, partyCode, rootContext, ambientProperties) {

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

        let result;
        try {
            self.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            self.view.stopBlockingUI();
        }

        if (!result.data || result.data.length == 0) { return true; }

        const filteredData = result.data.filter(item => item.metadata.entityId != rootContext.Id);
        if (filteredData.length == 0) { return true; }

        const notificationMessage = 'Уже есть сотрудник связанный с выбранным контрагентом!';
        ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        return false;
    }

    return true;

}

async function onChangePerson(input, ambientProperties, self) {
    const partyBody = input.componentContext.partyBody;
    const insuranceProduct = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct;
    const document = {
        partyCode: input.componentContext.partyCode,
        partyId: input.componentContext.partyId,
        DocumentNumber: input.rootContext.Number,
        Representation: 'Договор ' + input.rootContext.Number,
        entityId: input.rootContext.Id,
        fullName: input.componentContext.partyFullName,
        productDescription: insuranceProduct?.productDescription,
        productCode: insuranceProduct?.productCode
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
