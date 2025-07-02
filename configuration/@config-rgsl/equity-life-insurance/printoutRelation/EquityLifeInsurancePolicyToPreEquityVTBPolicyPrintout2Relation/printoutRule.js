'use strict';

module.exports = function rule(input) {

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'preEquityVTBPolicyPrintout2') {

        return true;
    }
};
