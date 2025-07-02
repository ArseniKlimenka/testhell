module.exports = function onChangeShowVerification(input) {
    delete input.data.holderName;
    delete input.data.contractNumber;
    delete input.data.issueDateFrom;
    delete input.data.issueDateTo;
    delete input.data.paymentFrequency;
    delete input.data.insuranceProduct;
    delete input.data.partner;
    delete input.data.attachmentVerificationState;
    delete input.data.contractState;
    this.view.reevaluateRules();
    this.view.search();
};
