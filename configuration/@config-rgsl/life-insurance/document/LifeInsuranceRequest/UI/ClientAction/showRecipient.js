const { typeOfRequest } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const { didPaymentClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function showRecipient(input) {

    const body = input.context.Body;
    const changeClass = body.changeClass;
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const isModificationTypeRequest = body.typeOfRequest === typeOfRequest.Modification;

    const showSignatureForm = isEquityProductGroup && isModificationTypeRequest && checkAvailabilitySome(didPaymentClassTypes, changeClass);

    return showSignatureForm;
};
