'use strict';

const { businessRules } = require('@adinsure/runtime');
const { isSkipAttachmentsValidationAPI } = require('@config-rgsl/life-insurance/lib/printoutsHelper');

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const partnerCode = body.mainInsuranceConditions?.partner?.partnerBusinessCode;
    const issueDate = body.basicConditions?.issueDate;

    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';
    const actor = this.applicationContext.actor;
    const isBackOffice = actor != 'Agent';

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};

    if (ePolicytConf.policyPrintout == 'basisInvestmentBFKOPolicyPrintoutEpolicy'
        && isEPolicy == true
        && (isBackOffice == true || isSkipAttachmentsValidationAPI(this, partnerCode))) {

        return true;
    }
};
