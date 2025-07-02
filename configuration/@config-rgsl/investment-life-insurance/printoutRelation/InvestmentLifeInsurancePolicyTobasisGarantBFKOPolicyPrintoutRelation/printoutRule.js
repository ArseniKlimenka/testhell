'use strict';

module.exports = function rule(input) {

    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'basisGarantBFKOPolicyPrintout' && isEPolicy == false) {

        return true;
    }
};
