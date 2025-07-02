'use strict';
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function rule(input) {

    const issueDate = input.body.basicConditions?.issueDate;

    const issueFormCode = input.body.issueForm?.code?.issueFormCode ?? '';
    const isEPolicy = issueFormCode == 'ePolicy';

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.policyPrintout == 'basisInvestmentBFKOPolicy2Printout' && isEPolicy == false
        && dateHelper.isAfterOrEqual(dateHelper.formatDate(issueDate), dateHelper.formatDate('2023-02-28'))) {

        return true;
    }
};
