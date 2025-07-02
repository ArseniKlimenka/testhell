'use strict';

module.exports = function showConfirmation2023(input, ambientProperties) {

    const finKnowledgeQuestionnaire2023 = input.componentContext.questionnaire ?? [];
    const allAnswersNo = finKnowledgeQuestionnaire2023 && finKnowledgeQuestionnaire2023.every(item => item.itemConfirmation === false);

    if (allAnswersNo) {
        return true;
    }

    input.componentContext.confirmation = undefined;
    return false;


};
