const { isSaveOperationAvailable, shouldDisableSaveableContract, isTermLifeProduct, isEBMGProduct } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { product, issueForm, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function disableAgreementPolicyHolder(input, ambientProperties) {

    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const ePolicy = input?.context?.Body?.issueForm?.code?.issueFormCode == issueForm.ePolicy.issueFormCode;

    if (isTermLifeProduct(input)) {

        return input.context.Body.declarationMainConfirmation.isConfirmedPolicyHolder;
    }

    if (!isSaveOperationAvailable(this.view) || shouldDisableSaveableContract(input, this.view)) { return true; }

    if (isEBMGProduct(input)) {
        return true;
    }

    if (productGroupArray.DISABLE_DECLARATION_AGREEMENT.includes(productCode) && ePolicy) {
        return true;
    }

    return input.context.Body.declarationMainConfirmation.isConfirmedPolicyHolder;

};
