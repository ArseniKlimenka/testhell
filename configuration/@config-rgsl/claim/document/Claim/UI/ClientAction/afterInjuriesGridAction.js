'use strict';

const { fillInjuriesNotes } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function afterInjuriesGridAction(input, ambientProperties) {

    const injuries = input.data.injuries ?? [];

    if (injuries.length > 0) {

        const reducer = (previousValue, currentValue) => previousValue + (parseFloat(currentValue.paymentInjuryPercentage) * parseInt(currentValue.numberOfInjuries));
        const totalPercentage = injuries.reduce(reducer, 0);

        input.context.Body.claimAmounts.paymentPercentage = totalPercentage;

        const injuriesCodes = injuries.map(item => item.injuryDetails.code);
        fillInjuriesNotes(input.context.Body, injuriesCodes);
    }
    else {

        fillInjuriesNotes(input.context.Body, []);
        delete input.context.Body.claimAmounts.paymentPercentage;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
