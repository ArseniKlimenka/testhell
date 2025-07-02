'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { businessRules } = require('@adinsure/runtime');

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
    const issueDate = body.basicConditions?.issueDate;
    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const isIDGZENIT = lifeInsuranceConstants.productGroupArray.IDG_ZENIT.includes(productCode);

    if (isIDGZENIT) { return; }

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};


    if (ePolicytConf.policyPrintout == 'driverGuaranteeZenithPolicyPrintoutEpolicy' && isEPolicy == true) {

        return true;
    }
};
