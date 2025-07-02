'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { productGroupArray, product, actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == actor.System;

    if (isSystemActor) {

        return true;
    }
    // <- Don't remove, needed to send email

    const body = input?.body;
    const mainInsuranceConditions = body?.mainInsuranceConditions;

    const productCode = mainInsuranceConditions?.insuranceProduct?.productCode;
    const isReinvest = productGroupArray.REINVEST.includes(productCode);
    const issueFormCode = body?.issueForm?.code?.issueFormCode;
    const isEPolicy = issueFormCode == 'ePolicy';

    const dateOfBirth = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const issueDate = body?.basicConditions?.issueDate;
    const age = dateUtils.getYearNumber(dateOfBirth, issueDate);

    const isNotdeclarationConfimed
        = !(printoutsHelper.isAllDeclarationMainConfirmed(body?.declarationMain)
        && printoutsHelper.isAllDeclarationMedicalConfirmed(body?.declarationMedical));

    const isEBMGZENIT = productCode == product.EBMGZENIT;
    const isAgeGreater71Less80 = age <= 80 && age >= 71;
    const isEBMGZENITCondition = isEBMGZENIT && (isAgeGreater71Less80 || isNotdeclarationConfimed);

    if (!productGroupArray.QUOTE_ACC_APP_SHOW.includes(productCode) && !isEBMGZENITCondition) {
        if (!isReinvest || (isReinvest && isEPolicy)) {

            return;
        }
    }

    const schemaValidations = input?.commonBody?.validations?.schemaValidations;
    if (!schemaValidations?.some(item => item.code == "existsTrigger")) {

        return;
    }

    if (!productCode || !issueDate) {

        return;
    }

    const hasOnlyUkspTrigger = body?.uwTriggers?.every(element => element.departament == 'UKSP');
    if (hasOnlyUkspTrigger) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.applicationPrintout == 'accApplicationPrintout') {

        return true;
    }
};
