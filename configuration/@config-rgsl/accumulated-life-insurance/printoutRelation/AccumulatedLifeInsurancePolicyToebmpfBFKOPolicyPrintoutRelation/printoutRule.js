'use strict';

module.exports = function rule(input) {

    const body = input.body;

    const issueFormCode = body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'ebmpfBFKOPolicyPrintout' && isEPolicy == false) {

        return true;
    }
};
