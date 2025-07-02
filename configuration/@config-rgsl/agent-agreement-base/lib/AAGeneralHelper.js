'use strict';

const { validateCommissionRules } = require('@config-rgsl/agent-agreement-base/lib/AAValidationHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');

function isSaveOperationAvailable(view) {

    if (view) {

        return view.getContext().AvailableOperations.some(x => x.Code == "Save");
    }

    return false;
}

function refreshView(view) {

    view.rebind();
    view.reevaluateRules();
    view.validate();
}

function updateCommissionRulesTable(input, view) {

    const commissionRules = input.rootContext.Body.commissionRules;

    if (commissionRules && commissionRules.length > 0) {

        commissionRules.forEach((element, index) => {

            element.ruleNum = index + 1;
            element.isInconsistent = false;
            checkAndUpdateDefaultValues(element);
        });
    }

    if (commissionRules && commissionRules.length > 1) {

        const codeTableValues = {
            productsList: input.rootContext.ClientViewModel.productsList?.map(i => i.identifier),
            creditProgramList: input.rootContext.ClientViewModel.creditProgramList?.map(i => i.identifier)
        };

        const result = validateCommissionRules(commissionRules, codeTableValues);

        if (result.hasIntersectedRules) {

            commissionRules.filter(
                x => x.ruleNum === result.intersection.r1 ||
                    x.ruleNum === result.intersection.r2)
                .forEach(x => { x.isInconsistent = true; });
        }
    }

    const productWithVariantsToSet = input.rootContext.ClientViewModel?.productWithVariantsToSet;

    if (productWithVariantsToSet?.length > 0) {

        input.affectedRow.insuranceProduct.values = productWithVariantsToSet;
    }

    view.rebind();
    view.reevaluateRules();
    view.validate();
}

function checkAndUpdateDefaultValues(element) {

    // insuranceProduct
    if (element.insuranceProduct === undefined) {

        element.insuranceProduct = {};
    }

    if (element.insuranceProduct.isInverted === undefined) {

        element.insuranceProduct.isInverted = false;
    }

    // insuranceCurrency
    if (element.insuranceCurrency === undefined) {

        element.insuranceCurrency = {};
    }

    if (element.insuranceCurrency.isInverted === undefined) {

        element.insuranceCurrency.isInverted = false;
    }

    // insuranceTerm
    if (element.insuranceTerm === undefined) {

        element.insuranceTerm = {};
    }

    if (element.insuranceTerm.isInverted === undefined) {

        element.insuranceTerm.isInverted = false;
    }

    if (element.insuranceTerm.value === undefined) {

        element.insuranceTerm.value = {};
    }

    if (element.insuranceTerm.value.fromIncluded === undefined) {

        element.insuranceTerm.value.fromIncluded === true;
    }

    if (element.insuranceTerm.value.toIncluded === undefined) {

        element.insuranceTerm.value.toIncluded = true;
    }

    // premiumPeriod
    if (element.premiumPeriod === undefined) {

        element.premiumPeriod = {};
    }

    if (element.premiumPeriod.isInverted === undefined) {

        element.premiumPeriod.isInverted = false;
    }

    if (element.premiumPeriod.value === undefined) {

        element.premiumPeriod.value = {};
    }

    if (element.premiumPeriod.value.fromIncluded === undefined) {

        element.premiumPeriod.value.fromIncluded === true;
    }

    if (element.premiumPeriod.value.toIncluded === undefined) {

        element.premiumPeriod.value.toIncluded = true;
    }


    // premiumPeriodType
    if (element.premiumPeriodType === undefined) {

        element.premiumPeriodType = {};
    }

    if (element.premiumPeriodType.isInverted === undefined) {

        element.premiumPeriodType.isInverted = false;
    }

    // isManualCorrectionDisabled
    if (element.isManualCorrectionDisabled === undefined) {

        element.isManualCorrectionDisabled = false;
    }

    // alwaysUseMaxRate
    if (element.alwaysUseMaxRate === undefined) {

        element.alwaysUseMaxRate = false;
    }

    // isDiscountDisabled
    if (element.isDiscountDisabled === undefined) {

        element.isDiscountDisabled = false;
    }

    // creditProgram
    if (element.creditProgram === undefined) {

        element.creditProgram = {};
    }

    if (element.creditProgram.isInverted === undefined) {

        element.creditProgram.isInverted = false;
    }

    // variant
    if (element.variant === undefined) {

        element.variant = {};
    }

    if (element.variant.isInverted === undefined) {

        element.variant.isInverted = false;
    }
}

function updateEmptyInsuranceYearTo(input) {

    const body = input.context.Body;

    body.commissionRules.forEach((rule) => {

        if (rule.insuranceYear?.value && !rule.insuranceYear.value?.to) {

            rule.insuranceYear.value.to = rule.insuranceYear.value?.from;
        }
    });
}

module.exports = {
    isSaveOperationAvailable,
    refreshView,
    updateCommissionRulesTable,
    updateEmptyInsuranceYearTo
};
