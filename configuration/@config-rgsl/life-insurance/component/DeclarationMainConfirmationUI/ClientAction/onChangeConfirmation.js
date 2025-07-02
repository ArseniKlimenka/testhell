const { product, productGroupArray, issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function onChangeConfirmation(input, ambientProperties) {

    const body = input?.context?.Body;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const ePolicy = input?.context?.Body?.issueForm?.code?.issueFormCode == issueForm.ePolicy.issueFormCode;
    const productForCheck = productGroupArray.PH_VALIDATION_CHECK.includes(productCode) && ePolicy;

    if (input.dataProperty == "isConfirmedPolicyHolder")
    { input.data.isNotConfirmedPolicyHolder = !input.data.isConfirmedPolicyHolder; }
    if (input.dataProperty == "isNotConfirmedPolicyHolder")
    { input.data.isConfirmedPolicyHolder = !input.data.isNotConfirmedPolicyHolder; }
    if (input.dataProperty == "isConfirmedInsuredPerson")
    { input.data.isNotConfirmedInsuredPerson = !input.data.isConfirmedInsuredPerson; }
    if (input.dataProperty == "isNotConfirmedInsuredPerson")
    { input.data.isConfirmedInsuredPerson = !input.data.isNotConfirmedInsuredPerson; }

    if (input.data.isConfirmedPolicyHolder)
    { input.context.Body.declarationMain.forEach(item => item.agreementPolicyHolder = true); }
    if (input.data.isConfirmedInsuredPerson)
    { input.context.Body.declarationMain.forEach(item => item.agreementInsuredPerson = true); }


    if (input.data.isConfirmedPolicyHolder && input.data.isConfirmedInsuredPerson) {
        null;
        // this.view.getControlByElementId('DeclarationMainArray').collapse();
    }
    else {
        null;
        // this.view.getControlByElementId('DeclarationMainArray').expand();
    }

    const isMainNotConfirmed = input.data.isNotConfirmedPolicyHolder;
    if (productForCheck && isMainNotConfirmed) {
        const ONLY_OK_BUTTON = 1;
        ambientProperties.services.confirmationDialog.showNotification('Страхователь не соответствует критериям декларации, невозможно оформить Договор.', 'OK', 'Cancel', ONLY_OK_BUTTON);
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();

};
