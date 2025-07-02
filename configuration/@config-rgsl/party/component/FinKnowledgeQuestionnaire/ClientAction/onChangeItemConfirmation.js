const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function onChangeItemConfirmation(input, ambientProperties) {

    if (input.componentContext.finKnowledgeQuestionnaire) {
        input.componentContext.finKnowledgeQuestionnaire.lastUpdateDate = DateTimeUtils.newDateAsString();
    }

    this.view.reevaluateRules();

};
