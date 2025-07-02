module.exports = function accumulatedLifeInsurancePolicyTabsVisible(input) {
    if ( input.rootContext.ConfigurationCodeName == "LifeInsuranceAttachmentVerification") {
        this.hideTab('Insurance Conditions');
        this.hideTab('Participants');
        this.hideTab('Additional Conditions');
        this.hideTab('Underwriting');
        this.hideTab('PaymentPlan');
        this.hideTab('Surrender Values');
        this.hideTab('Declaration');
        this.hideTab('History');
    }
};
