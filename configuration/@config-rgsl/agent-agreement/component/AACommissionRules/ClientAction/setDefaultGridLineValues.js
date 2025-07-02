'use strict';

/**
 * @translationKey {translationKey} PleaseSaveDocumentFirst
 */
module.exports = function setDefaultGridLineValues(input, ambientProperties) {

    const { rootContext, affectedRow } = input;

    if (!rootContext.Number) {

        ambientProperties.services.confirmationDialog
            .showConfirmation(ambientProperties.configurationCodeName.toUpperCase() + '.PleaseSaveDocumentFirst', 'OK', 'OK', 2);
        return false;
    }

    affectedRow.registratorNumber = rootContext.Number;

    const validity = rootContext.Body.validity;
    let startDate = undefined;

    if (input.rootContext.ConfigurationCodeName === 'AgentAgreement') {
        startDate = validity.startDate;
    }
    else {
        startDate = rootContext.Body.amendmentData?.changeAmendmentData.validity.startDate;
    }

    if (validity && !affectedRow.startDate && !affectedRow.endDate) {
        affectedRow.startDate = startDate;
        affectedRow.endDate = validity.endDate;
    }

    affectedRow.insuranceProduct = {};
    affectedRow.insuranceProduct.isInverted = false;

    affectedRow.insuranceCurrency = {};
    affectedRow.insuranceCurrency.isInverted = false;

    affectedRow.insuranceTerm = {};
    affectedRow.insuranceTerm.isInverted = false;

    affectedRow.insuranceTerm.value = {};
    affectedRow.insuranceTerm.value.fromIncluded = true;
    affectedRow.insuranceTerm.value.toIncluded = true;

    affectedRow.premiumPeriod = {};
    affectedRow.premiumPeriod.isInverted = false;

    affectedRow.premiumPeriod.value = {};
    affectedRow.premiumPeriod.value.fromIncluded = true;
    affectedRow.premiumPeriod.value.toIncluded = true;

    affectedRow.insuranceYear = {};

    affectedRow.insuranceYear.value = {};
    affectedRow.insuranceYear.value.fromIncluded = true;
    affectedRow.insuranceYear.value.toIncluded = true;

    affectedRow.premiumPeriodType = {};
    affectedRow.premiumPeriodType.isInverted = false;

    affectedRow.isManualCorrectionDisabled = false;
    affectedRow.alwaysUseMaxRate = false;
    affectedRow.isDiscountDisabled = false;

    affectedRow.creditProgram = {};
    affectedRow.creditProgram.isInverted = false;

    affectedRow.variant = {};
    affectedRow.variant.isInverted = false;

    return true;
};
