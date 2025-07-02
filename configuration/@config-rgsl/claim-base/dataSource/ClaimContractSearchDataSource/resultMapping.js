'use strict';

const { translationUtils } = require('@adinsure/runtime');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function resultMapping(input) {

    if (input) {

        return {
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
            paymentFrequency: input.body.paymentFrequency,
            amount: input.body.amount ? round(input.body.amount, 2) : undefined,
            amountWithAllRisks: input.body.amountWithAllRisks ? round(input.body.amountWithAllRisks, 2) : undefined,
            initiatorName: input.body.initiatorName,
            initiatorOrganisationUnitName: input.body.initiatorOrganisationUnitName,
            items: input.body.items,
            parties: input.body.parties
        };
    }
};
