'use strict';

module.exports = function rule(input) {

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'notePremiumPolicyPrintout') {

        return true;
    }
};
