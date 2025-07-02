'use strict';

module.exports = {

    generateOutput: function (input, output) {

        const insuranceRuleCode = input.body.insuranceRules?.ruleCode;

        if (insuranceRuleCode) {

            output.insuranceRules = {
                ruleCode: input.body.insuranceRules.ruleCode,
                ruleDescription: input.body.insuranceRules.ruleDescription,
                ruleDate: input.body.insuranceRules.ruleDate
            };
        }

        output.commission.agentAgreement.externalNumber = input.body.commission?.agentAgreement?.externalNumber;
        output.paymentFrequencyWithCode = input.body.basicConditions?.paymentFrequency;
        output.endowmentPaymentVariant = input.body.basicConditions?.endowmentPaymentVariant;
        output.insuranceTerms = input.body.basicConditions?.insuranceTerms;
        output.currencyCode = input.body.basicConditions?.currency?.currencyCode;
        output.productStrategyDescription = input.body.basicInvestmentParameters?.investmentStrategy?.investmentStrategyDescription;
        output.exchangeRate = input.body.basicConditions?.exchangeRate;
        output.consent = input.body.consent;

        const policyHolder = input.body.policyHolder;
        const policyHolderCode = input.body.policyHolder?.partyData?.partyCode;

        if (policyHolderCode) {

            if (!output.parties) {

                output.parties = {};
            }

            output.parties.holder = {
                personId: policyHolder.partyData.partyId,
                personCode: policyHolder.partyData.partyCode,
                partyType: policyHolder.partyData.partyType,
                fullName: policyHolder.partyData.partyFullName
            };
        }

        const insuredPerson = input.body.insuredPerson;
        const insuredPersonCode = input.body.insuredPerson?.partyData?.partyCode;

        if (insuredPersonCode) {

            if (!output.parties) {

                output.parties = {};
            }

            output.parties.insuredPerson = {
                personId: insuredPerson.partyData.partyId,
                personCode: insuredPerson.partyData.partyCode,
                partyType: insuredPerson.partyData.partyType,
                fullName: insuredPerson.partyData.partyFullName
            };
        }

        const beneficiaries = input.body.beneficiaries;

        if (beneficiaries) {

            if (!output.beneficiaries) {

                output.beneficiaries = {};
            }

            output.beneficiaries.isHeritors = beneficiaries.isHeritors;
            output.beneficiaries.isNotHeritors = beneficiaries.isNotHeritors;

            const beneficiariesArray = beneficiaries.beneficiaries;

            if (beneficiariesArray && beneficiariesArray.length > 0) {

                if (!output.beneficiaries.beneficiaries) {

                    output.beneficiaries.beneficiaries = [];
                }

                output.beneficiaries.beneficiaries = beneficiariesArray.map(item => {
                    return {
                        beneficiaryId: item.beneficiaryId,
                        partyFullName: item.partyFullName,
                        dateOfBirth: item.dateOfBirth,
                        share: item.share,
                        relationType: item.relationType
                    };
                });
            }
        }

        output.futureContractNumber = input.body.technicalInformation?.futureContractNumber;

        return output;
    }
};

