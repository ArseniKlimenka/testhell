'use strict';

const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showAttachmentsTab(input) {

    if (!input.context.IsSaved) { return false; }

    if (
        [
            implConstants.viewType.NaturalPerson,
            implConstants.viewType.LegalEntity,
            lifeInsuranceConstants.productCode.CreditLifeInsuranceQuote
        ].includes(input.context.ConfigurationCodeName)) { return false; }
    return true;

};
