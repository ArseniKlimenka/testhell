'use strict';

const { businessRules } = require('@adinsure/runtime');
const { isSkipAttachmentsValidationAPI } = require('@config-rgsl/life-insurance/lib/printoutsHelper');
const { productGroupArray, actor, policyState, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

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
    const sysActor = this.applicationContext.actor;
    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const isBackOffice = sysActor != 'Agent';
    const hidePrintout = [product.IDG2ZENIT, product.IDG3ZENIT, product.IDG5ZENIT].includes(productCode) || lifeInsuranceConstants.productGroupArray.IDG_RET_VTB.includes(productCode);

    if (hidePrintout) { return; }

    const documentState = this.businessContext.documentState;
    const documentStateIsActive = [policyState.Active, policyState.Activated].includes(documentState);

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};

    if (isSystemActor || (ePolicytConf.policyPrintout == 'basisGarantBFKOPolicyPrintoutEpolicy'
        && isEPolicy == true
        && (isBackOffice == true || isSkipAttachmentsValidationAPI(this, partnerCode)))) {

        return true;
    }
};
