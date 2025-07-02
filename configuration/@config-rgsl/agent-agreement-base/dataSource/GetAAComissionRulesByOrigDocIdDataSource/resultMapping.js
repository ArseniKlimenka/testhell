'use strict';

module.exports = function resultMapping(input) {
    const result = {};
    const parsedBody = JSON.parse(input.SNAPSHOT_BODY);

    result.comissionRules = parsedBody.commissionRules.map((item) => {

        return {
            startDate: item.startDate,
            endDate: item.endDate,
            insuranceYearFrom: item.insuranceYear?.value?.from,
            insuranceYearTo: item.insuranceTerm?.value?.to,
            insuranceTermFrom: item.insuranceTerm?.value?.from,
            insuranceTermTo: item.insuranceTerm?.value?.to,
            premiumPeriodFrom: item.premiumPeriod?.value?.from,
            premiumPeriodTo: item.premiumPeriod?.value?.to,
            rate: item.rate,
            expensesRate: item.expensesRate,
            natuaralPersonRate: item.natuaralPersonRate,
            solePropriatorRate: item.solePropriatorRate,
            isManualCorrectionDisabled: item.isManualCorrectionDisabled,
            alwaysUseMaxRate: item.alwaysUseMaxRate,
            isDiscountDisabled: item.isDiscountDisabled,
            creditProgram: item.creditProgram,
            insuranceCurrency: item.insuranceCurrency,
            premiumPeriodType: item.premiumPeriodType,
            insuranceProduct: item.insuranceProduct,
            notFoundProducts: item.notFoundProducts,
            manualRule: item.manualRule,
            manualRuleDescription: item.manualRuleDescription
        };
    });

    return result;
};
