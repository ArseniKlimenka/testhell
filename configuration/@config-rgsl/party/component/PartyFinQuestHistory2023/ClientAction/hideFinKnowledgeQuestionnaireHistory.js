'use strict';

const { finKnowledge2024ActualDate } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function hideFinKnowledgeQuestionnaireHistory(input, ambientProperties) {

    const partyCreatedOn = input?.context?.AuditInfo.CreatedOn;
    const isPartyCreatedBefore2024 = DateTimeUtils.isBefore(DateTimeUtils.formatDate(partyCreatedOn), DateTimeUtils.formatDate(finKnowledge2024ActualDate));

    if (isPartyCreatedBefore2024) {
        return false;
    }

    return true;

};
