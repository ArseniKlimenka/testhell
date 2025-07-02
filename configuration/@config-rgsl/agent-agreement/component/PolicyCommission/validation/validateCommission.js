'use strict';

const { groupByMultipleKeys } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} commItemsWithoutCommissionFound
 * @errorCode {errorCode} onlyFiveSignsForManualRule
 */

module.exports = function validateCommission(input) {

    const validationErrors = [];
    const body = this.businessContext.rootData;

    const initialCommItems = input.policyCommissionItems || [];
    const filteredCommItems = filterCommItems(initialCommItems);


    const commItemsWithoutCommission = filteredCommItems.filter(i =>
        (i.calculatedRate === undefined || i.calculatedRate === 0) &&
        (i.manualRate === undefined || i.manualRate === 0) &&
        (i.calculatedAmount === undefined || i.calculatedAmount === 0) &&
        (i.manualAmount === undefined || i.manualAmount === 0) &&
        (i.calculatedExpensesRate === undefined || i.calculatedExpensesRate === 0) &&
        (i.manualExpensesRate === undefined || i.manualExpensesRate === 0) &&
        (i.calculatedNatuaralPersonRate === undefined || i.calculatedNatuaralPersonRate === 0) &&
        (i.manualNatuaralPersonRate === undefined || i.manualNatuaralPersonRate === 0) &&
        (i.calculatedSolePropriatorRate === undefined || i.calculatedSolePropriatorRate === 0) &&
        (i.manualSolePropriatorRate === undefined || i.manualSolePropriatorRate === 0));

    const isTechnicalAa = getValue(body, 'commission.agentAgreement.isTechnical');
    const skipCommItemsValidation = getValue(body, 'commission.skipCommItemsValidation');

    if (!skipCommItemsValidation && !isTechnicalAa && (commItemsWithoutCommission.length > 0 || filteredCommItems.length === 0)) {

        validationErrors.push({
            errorCode: "commItemsWithoutCommissionFound"
        });
    }

    if (body.commission.manualRule && body.commission.manualRule.length != 5) {
        validationErrors.push({
            errorCode: "onlyFiveSignsForManualRule"
        });
    }

    return validationErrors;
};

function filterCommItems(commissionItems) {

    let result = [];

    if (!commissionItems || commissionItems.length === 0) {

        return result;
    }

    const groupedCommItems = groupByMultipleKeys(commissionItems, ['insuredObjectCode', 'policyItemCode']);

    for (const insuredObject in groupedCommItems) {

        for (const policyItem in groupedCommItems[insuredObject]) {

            const currentCommItems = groupedCommItems[insuredObject][policyItem] || [];
            const firstPeriodCommItem = currentCommItems.find(i => i.periodNumber === 1);

            if (!firstPeriodCommItem) {

                continue;
            }

            const nonZeroCommItems = currentCommItems.filter(i =>
                i.calculatedRate > 0 ||
                i.calculatedAmount > 0 ||
                i.calculatedExpensesRate > 0 ||
                i.calculatedNatuaralPersonRate > 0 ||
                i.calculatedSolePropriatorRate > 0);

            if (nonZeroCommItems.length > 0) {

                result = result.concat(nonZeroCommItems);
            }
            else {

                result = result.concat(currentCommItems);
            }
        }
    }

    return result;
}
