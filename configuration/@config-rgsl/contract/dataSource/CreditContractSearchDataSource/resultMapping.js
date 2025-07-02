'use strict';

const { translationUtils } = require('@adinsure/runtime');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function resultMapping(input) {

    if (input) {

        return {
            id: input.id,
            number: input.number,
            productGroup: input.metadata.configuration.dimensions.productGroup,
            productGroupDescription: translationUtils.getTranslation(
                'dataSource/GeneralContractSearchDataSource/1',
                'enum',
                'productGroup',
                input.metadata.configuration.dimensions.productGroup,
                'ProductGroup'),
            productCode: input.body.productCode,
            productDescription: input.body.productDescription,
            contractType: input.metadata.configuration.dimensions.contractType,
            contractTypeDescription: translationUtils.getTranslation(
                'dataSource/GeneralContractSearchDataSource/1',
                'enum',
                'contractType',
                input.metadata.configuration.dimensions.contractType,
                'GeneralContractSearchDataSourceInputSchema'),
            stateCode: input.stateCode,
            stateCodeDescription: translationUtils.getTranslation(
                `document/${input.metadata.configuration.name}/1`,
                'states',
                null,
                input.stateCode),
            issueDate: input.body.issueDate,
            startDate: input.body.startDate,
            endDate: input.body.endDate,
            policyHolderName: input.body.parties.holder.fullName,
            insuredPersonName: input.body.parties.insuredPerson.fullName,
            paymentFrequency: input.body.paymentFrequency,
            currencyCode: input.body.currencyCode,
            amount: input.body.amount ? round(input.body.amount, 2) : undefined,
            amountWithAllRisks: input.body.amountWithAllRisks ? round(input.body.amountWithAllRisks, 2) : undefined,
            initiatorName: input.body.initiatorName,
            initiatorOrganisationUnitName: input.body.initiatorOrganisationUnitName,
            partner: input.body.partner,
            items: input.body.items,
            parties: input.body.parties,
            isReinvest: isReinvestMaping(input.body.isReinvest),
            issueFormCode: translationUtils.getTranslation(
                'dataSource/GeneralContractSearchDataSource/1',
                'enum',
                'issueFormCode',
                input.body.issueFormCode,
                'GeneralContractSearchDataSourceInputSchema'),
            creditProgram: input.body.creditProgram ? input.body.creditProgram : {},
            insuranceRules: input.body.insuranceRules ? input.body.insuranceRules : {},
            beneficiaries: input.body.beneficiaries ? input.body.beneficiaries : {},
            paymentFrequencyWithCode: input.body.paymentFrequencyWithCode,
            endowmentPaymentVariant: input.body.endowmentPaymentVariant,
            productStrategyCode: input.body.productStrategyCode,
            productStrategyDescription: input.body.productStrategyDescription,
            insuranceTerms: input.body.insuranceTerms ? Number(input.body.insuranceTerms) : undefined,
            cardType: input.body.cardType
        };
    }
};

function isReinvestMaping(input) {
    let result = false;

    switch (input) {
        case true:
            result = true;
            break;
        case 'true':
            result = true;
            break;
        default:
            break;
    }

    return result;
}
