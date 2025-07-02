'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { businessRules } = require('@adinsure/runtime');
const { isSkipAttachmentsValidationAPI } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    // Don't remove, needed to send email ->
    const actor = this.applicationContext.actor;
    const isSystemActor = actor == lifeInsuranceConstants.actor.System;

    if (isSystemActor) {
        return true;
    }
    // <- Don't remove, needed to send email

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const partnerCode = body.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const issueDate = body.basicConditions?.issueDate;

    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const isBackOffice = actor != 'Agent';
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);

    if (isIDGZENIT) { return; }

    const documentState = this.businessContext.documentState;
    const documentStateIsActive = [lifeInsuranceConstants.policyState.Active, lifeInsuranceConstants.policyState.Activated].includes(documentState);

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};

    if (isSystemActor || (ePolicytConf.policyPrintout == 'driverGuaranteeZenithPolicyPrintoutEpolicy'
        && isEPolicy == true
        && (isBackOffice == true || isSkipAttachmentsValidationAPI(this, partnerCode)))) {

        return true;
    }
};
