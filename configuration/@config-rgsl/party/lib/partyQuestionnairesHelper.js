'use strict';

const { finKnowledgeQuestionnaire, finKnowledgeQuestionnaire2023, finKnowledgeQuestionnaire2024 } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');

function setfinKnowledgeQuestionnaire(finKnowledgeQuestionnaireObj, finKnowledgeQuestionnaire, inputContext) {

    const body = inputContext?.context?.Body || inputContext?.businessContext?.rootData;
    const finObj = body[finKnowledgeQuestionnaireObj];
    if (!finObj) {
        body[finKnowledgeQuestionnaireObj] = {};
    }
    const questionnaire = body[finKnowledgeQuestionnaireObj].questionnaire;
    if (!questionnaire || questionnaire.length == 0) {
        body[finKnowledgeQuestionnaireObj].questionnaire = finKnowledgeQuestionnaire;
    }
}

function setAllFinKnowledgeQuestionnaires(inputContext) {
    setfinKnowledgeQuestionnaire("finKnowledgeQuestionnaire", finKnowledgeQuestionnaire, inputContext);
    setfinKnowledgeQuestionnaire("finKnowledgeQuestionnaire2023", finKnowledgeQuestionnaire2023, inputContext);
    setfinKnowledgeQuestionnaire("finKnowledgeQuestionnaire2024", finKnowledgeQuestionnaire2024, inputContext);
}

module.exports = {
    setfinKnowledgeQuestionnaire,
    setAllFinKnowledgeQuestionnaires
};
