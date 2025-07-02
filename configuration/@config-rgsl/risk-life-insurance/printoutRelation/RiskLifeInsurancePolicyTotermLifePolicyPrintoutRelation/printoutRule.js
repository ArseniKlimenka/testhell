'use strict';
const { issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == issueForm.ePolicy.issueFormCode;

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'termLifePolicyPrintout' && isEPolicy == false) {

        return true;
    }
};
