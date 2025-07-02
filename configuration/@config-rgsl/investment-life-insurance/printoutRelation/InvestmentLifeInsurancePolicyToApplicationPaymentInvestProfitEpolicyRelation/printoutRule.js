'use strict';

const { businessRules } = require('@adinsure/runtime');

module.exports = function rule(input) {

    const body = input.body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate;

    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    const ePolicytConfiguration = businessRules.getRuleByVersion('EPolicytConfigurationRule', 1).rule;
    const ePolicytConf = ePolicytConfiguration({ productCode, issueDate }).result ?? {};

    if (isEPolicy == true && ePolicytConf.ApplicationPaymentInvestProfit == true) {

        return true;
    }
};
