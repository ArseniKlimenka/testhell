'use strict';

const { investmentParametersEditClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showSignatureForm(input) {

    const body = input.context.Body;
    const changeClass = body.changeClass;
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;

    const showSignatureForm = checkAvailabilitySome(investmentParametersEditClassTypes, changeClass) || isEquityProductGroup;

    return showSignatureForm;
};
