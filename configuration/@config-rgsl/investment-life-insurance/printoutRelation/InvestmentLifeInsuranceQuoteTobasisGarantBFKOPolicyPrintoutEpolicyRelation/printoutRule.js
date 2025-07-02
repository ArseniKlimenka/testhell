'use strict';

const { businessRules } = require('@adinsure/runtime');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;
    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const actor = this.applicationContext.actor;

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};
    const isIDGZENIT = productGroupArray.IDG_ZENIT.includes(productCode) || productGroupArray.IDG_RET_VTB.includes(productCode);

    if (isIDGZENIT) { return; }

    if (ePolicytConf.policyPrintout == 'basisGarantBFKOPolicyPrintoutEpolicy' && isEPolicy == true) {

        return true;
    }
};
