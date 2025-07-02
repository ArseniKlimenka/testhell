module.exports = function naturalPersonTabsVisible(input) {
    if (input.rootContext.ConfigurationCodeName == "LifeInsuranceAttachmentVerification") {
        this.hideTab('MainTab');
        this.hideTab('QuestionnaireTab');
    }
    this.enableTab('QuestionnaireTab');
};
