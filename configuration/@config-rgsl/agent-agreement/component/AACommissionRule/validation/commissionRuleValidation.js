'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
 * @errorCode {errorCode} endDateShouldBeGreaterThanStartDate
 * @errorCode {errorCode} bothBoundsShouldBeDefinedForInsuranceTerm
 * @errorCode {errorCode} bothBoundsShouldBeDefinedForPremiumPeriod
 * @errorCode {errorCode} insuranceTermUpperBoundShouldBeGreaterThanLowerBound
 * @errorCode {errorCode} insuranceTermLowerBoundShouldBeLesserThanUpperBound
 * @errorCode {errorCode} premiumPeriodUpperBoundShouldBeGreaterThanLowerBound
 * @errorCode {errorCode} premiumPeriodLowerBoundShouldBeLesserThanUpperBound
 * @errorCode {errorCode} atlestOneRuleAttributeShouldBeDefined
 * @errorCode {errorCode} rateOrAmountShouldBeDefined
 * @errorCode {errorCode} onlyRateOrAmountShouldBeDefined
 * @errorCode {errorCode} ruleStartDateShouldBeGreaterOrEquealToDocStartDate
 * @errorCode {errorCode} ruleEndDateShouldBeLessOrEquealThanDocEndDate
 * @errorCode {errorCode} commissionRuleShouldHasAtLeastOneProductAssigned
 * @errorCode {errorCode} manualRuleShouldBeFivesDigital
 */

module.exports = function rootLevelValidation(input) {

    const validationErrors = [];
    const body = this.businessContext.rootData;

    if (input.startDate) {

        const parsedStartDate = Date.parse(input.startDate);
        const parsedDocStartDate = Date.parse(this.businessContext.rootData.validity.startDate);

        if (parsedStartDate < parsedDocStartDate) {

            validationErrors.push({
                errorCode: "ruleStartDateShouldBeGreaterOrEquealToDocStartDate",
                errorDataPath: '/startDate'
            });
        }
    }

    if (input.endDate) {

        const parsedEndDate = Date.parse(input.endDate);
        const parsedDocEndDate = Date.parse(this.businessContext.rootData.validity.endDate);

        if (parsedDocEndDate < parsedEndDate) {

            validationErrors.push({
                errorCode: "ruleEndDateShouldBeLessOrEquealThanDocEndDate",
                errorDataPath: '/endDate'
            });
        }
    }

    if (input.startDate && input.endDate) {

        const parsedStartDate = Date.parse(input.startDate);
        const parsedEndDate = Date.parse(input.endDate);

        if (parsedEndDate < parsedStartDate) {

            validationErrors.push({
                errorCode: "endDateShouldBeGreaterThanStartDate",
                errorDataPath: '/startDate'
            });
        }
    }

    const insuranceTermValue = getValue(input, 'insuranceTerm.value');

    if (insuranceTermValue) {

        if (insuranceTermValue.from && !insuranceTermValue.to || (!insuranceTermValue.from && insuranceTermValue.to)) {

            validationErrors.push({
                errorCode: "bothBoundsShouldBeDefinedForInsuranceTerm",
            });
        }

        if (insuranceTermValue.from && insuranceTermValue.to) {

            if (insuranceTermValue.from > insuranceTermValue.to) {

                validationErrors.push({
                    errorCode: "insuranceTermUpperBoundShouldBeGreaterThanLowerBound",
                    errorDataPath: '/insuranceTerm/value/from'
                });
            }

            if (insuranceTermValue.to < insuranceTermValue.from) {

                validationErrors.push({
                    errorCode: "insuranceTermLowerBoundShouldBeLesserThanUpperBound",
                    errorDataPath: '/insuranceTerm/value/to'
                });
            }
        }
    }

    const premiumPeriodValue = getValue(input, 'premiumPeriod.value');

    if (premiumPeriodValue) {

        if (premiumPeriodValue.from && !premiumPeriodValue.to || (!premiumPeriodValue.from && premiumPeriodValue.to)) {

            validationErrors.push({
                errorCode: "bothBoundsShouldBeDefinedForPremiumPeriod",
            });
        }

        if (premiumPeriodValue.from && premiumPeriodValue.to) {

            if (premiumPeriodValue.from > premiumPeriodValue.to) {

                validationErrors.push({
                    errorCode: "premiumPeriodUpperBoundShouldBeGreaterThanLowerBound",
                    errorDataPath: '/premiumPeriod/value/from'
                });
            }

            if (premiumPeriodValue.to < premiumPeriodValue.from) {

                validationErrors.push({
                    errorCode: "premiumPeriodLowerBoundShouldBeLesserThanUpperBound",
                    errorDataPath: '/premiumPeriod/value/to'
                });
            }
        }
    }

    if (!input.insuranceProduct?.values &&
        !input.insuranceCurrency?.value?.code &&
        !input.insuranceYear?.value &&
        !input.insuranceTerm?.value?.from &&
        !input.premiumPeriod?.value?.from &&
        !input.premiumPeriodType?.value &&
        !input.creditProgram?.values &&
        !input.variant?.values) {

        validationErrors.push({
            errorCode: "atlestOneRuleAttributeShouldBeDefined",
        });
    }

    const isTechnical = getValue(body, 'mainAttributes.isTechnical');

    if ((input.rate === undefined &&
        input.amount === undefined &&
        input.expensesRate === undefined &&
        input.natuaralPersonRate === undefined &&
        input.solePropriatorRate === undefined) ||
        (!isTechnical &&
            (input.rate === 0 ||
             input.amount === 0 ||
             input.expensesRate === 0 ||
             input.natuaralPersonRate === 0 ||
             input.solePropriatorRate === 0))) {

        validationErrors.push({
            errorCode: "rateOrAmountShouldBeDefined",
        });
    }

    if ((input.rate || input.minRate || input.maxRate) && input.amount) {

        validationErrors.push({
            errorCode: "onlyRateOrAmountShouldBeDefined",
        });
    }

    const products = getValue(input, 'insuranceProduct.values');

    if (!products || products.length === 0) {

        validationErrors.push({
            errorCode: "commissionRuleShouldHasAtLeastOneProductAssigned"
        });
    }

    const exectlyFiveDigitsRegex = /^\d{5}$/;

    if (input.manualRule && !exectlyFiveDigitsRegex.test(input.manualRule)) {

        validationErrors.push({
            errorCode: "manualRuleShouldBeFivesDigital"
        });
    }

    return validationErrors;
};
