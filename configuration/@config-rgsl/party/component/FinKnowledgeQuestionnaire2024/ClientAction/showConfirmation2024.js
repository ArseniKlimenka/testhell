'use strict';

module.exports = function showConfirmation2024(input, ambientProperties) {

    const finKnowledgeQuestionnaire2024 = input.componentContext.questionnaire ?? [];
    const allAnswersNo = finKnowledgeQuestionnaire2024 && finKnowledgeQuestionnaire2024.every(item => item.itemConfirmation === false);

    if (allAnswersNo) {
        return true;
    }

    input.componentContext.confirmation = undefined;
    return false;
};
