'use strict';

const { setAllFinKnowledgeQuestionnaires } = require('@config-rgsl/party/lib/partyQuestionnairesHelper');

module.exports = function applyData(input, dataSourceResponse) {

    setAllFinKnowledgeQuestionnaires(this);

};
