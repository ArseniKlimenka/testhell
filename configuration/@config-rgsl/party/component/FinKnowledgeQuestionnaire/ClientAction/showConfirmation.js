module.exports = function showConfirmation(input, ambientProperties) {

    const finKnowledgeQuestionnaire = input.componentContext.questionnaire ?? [];
    const allAnswersNo = finKnowledgeQuestionnaire && finKnowledgeQuestionnaire.every(item => item.itemConfirmation === false);

    if (allAnswersNo) {
        return true;
    }

    input.componentContext.confirmation = undefined;
    return false;


};
