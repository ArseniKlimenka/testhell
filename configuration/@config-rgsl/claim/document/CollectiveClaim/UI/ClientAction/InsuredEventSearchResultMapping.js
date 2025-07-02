'use strict';

const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { exchangeRateLookup } = require('@config-rgsl/acc-base/lib/currencyConversionHelper');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { endowmentRisks } = require('@config-rgsl/claim-base/lib/claimConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function InsuredEventSearchResultMapping(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        input.data.Body.mainAttributes.insuredEvent = {};
        input.data.Body.mainAttributes.insuredEvent.insuredEventNumber = lookupSelection[0].resultData.documentNumber;
        input.data.Body.mainAttributes.insuredEvent.insuredEventType = lookupSelection[0].resultData.insuredEventType;
        input.data.Body.mainAttributes.insuredEvent.insuredEventReason = lookupSelection[0].resultData.insuredEventReason;
        input.data.Body.mainAttributes.insuredEvent.insuredEventDate = lookupSelection[0].resultData.insuredEventDate;
        input.data.Body.mainAttributes.diagnosis = lookupSelection[0].resultData.diagnosis;
        input.data.Body.mainAttributes.diagnosisNote = lookupSelection[0].resultData.diagnosisNote;

        let risksToAdd = [];

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GeneralContractSearchDataSource',
            data: {
                data: {
                    criteria: {
                        number: lookupSelection[0].resultData.contractNumber
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        let contractResult;
        try {
            this.view.startBlockingUI();
            contractResult = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }
        let holderData = undefined;
        if (contractResult && contractResult.data && contractResult.data.length === 1) {

            input.data.Body.mainAttributes.contract = {};
            input.data.Body.mainAttributes.contract.number = contractResult.data[0].resultData.number;
            input.data.Body.mainAttributes.contract.holder = contractResult.data[0].resultData.policyHolderName;
            input.data.Body.mainAttributes.contract.configurationName = contractResult.data[0].metadata.configurationName;
            input.data.Body.claimAmounts.contractCurrency = contractResult.data[0].resultData.items[0].attributes.currency;
            input.data.Body.mainAttributes.selectedRisk = undefined;

            holderData = contractResult.data[0].resultData.parties.holder;

            if (!input.data.Body.mainAttributes.policyHolderInfo) {

                input.data.Body.mainAttributes.policyHolderInfo = {};
            }

            input.data.Body.mainAttributes.policyHolderInfo.policyHolder = {
                partyCode: holderData.personCode,
                partyType: holderData.partyType,
                fullName: holderData.fullName
            };

            let risks = contractResult.data[0].resultData.items[0].attributes.risks || [];
            risks = risks.filter(item => !endowmentRisks.includes(item.riskCode));

            risksToAdd = risks.map(risk => {

                return {
                    riskCode: risk.riskCode,
                    riskShortDescription: risk.riskShortDescription
                };
            });

        } else {

            input.data.Body.mainAttributes.contract = {};
            input.data.Body.mainAttributes.contract.number = lookupSelection[0].resultData.contractNumber;
            input.data.Body.mainAttributes.policyHolderInfo = {};
        }

        const risksRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RisksDataSource',
            data: {
                data: {
                    criteria: {
                    }
                }
            }
        };

        let risksResult;
        try {
            this.view.startBlockingUI();
            risksResult = await ambientProperties.services.api.call(risksRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (risksResult?.data && risksResult.data.length > 0) {

            risksToAdd.forEach(risk => {

                const riskData = risksResult.data.find(data => data.resultData.riskCode === risk.riskCode);

                if (riskData) {

                    risk.businessLine = riskData.resultData.businessLine;
                }
            });
        }

        input.data.Body.mainAttributes.availableRisks = risksToAdd;

        if (input.data.Body.mainAttributes.contract && input.data.Body.mainAttributes.contract.number) {

            await this.view.evaluate(['[GetDuplicatedClaims]'], false, true);
            await this.view.evaluate(['[GetPolicyCancellationData]'], false, true);

            const exchangeRate = await exchangeRateLookup([], input.data.Body.claimAmounts.contractCurrency, currency.localCurrency, ambientProperties, dateUtils.dateNow());
            input.data.Body.claimAmounts.exchangeRate = exchangeRate;
        }
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
