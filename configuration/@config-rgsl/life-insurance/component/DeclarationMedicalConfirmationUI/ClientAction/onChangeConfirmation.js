const { product, productGroupArray, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function onChangeConfirmation(input, ambientProperties) {

    const body = input?.context?.Body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const ePolicy = input?.context?.Body?.issueForm?.code?.issueFormCode == issueForm.ePolicy.issueFormCode;
    const productForCheck = productGroupArray.PH_VALIDATION_CHECK.includes(productCode) && ePolicy;

    if (input.dataProperty == "isConfirmed")
    { input.data.isNotConfirmed = !input.data.isConfirmed; }
    else
    { input.data.isConfirmed = !input.data.isNotConfirmed; }


    if (input.data.isConfirmed) {
        input.context.Body.declarationMedical.forEach(item => item.agreement = true);
        // this.view.getControlByElementId('DeclarationMedicalArray').collapse();
    }
    else {
        null;
        // this.view.getControlByElementId('DeclarationMedicalArray').expand();
    }
    const isMedicalNotConfirmed = input.data.isNotConfirmed;
    if (productForCheck && isMedicalNotConfirmed) {
        const ONLY_OK_BUTTON = 1;
        ambientProperties.services.confirmationDialog.showNotification('Страхователь не соответствует критериям декларации, невозможно оформить Договор.', 'OK', 'Cancel', ONLY_OK_BUTTON);
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
