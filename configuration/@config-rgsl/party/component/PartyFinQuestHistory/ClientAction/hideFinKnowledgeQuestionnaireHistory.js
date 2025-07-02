'use strict';

const { finKnowledge2023ActualDate } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function hideFinKnowledgeQuestionnaireHistory(input, ambientProperties) {

    const partyCreatedOn = input?.context?.AuditInfo?.CreatedOn;
    const isPartyCreatedBefore2023 = DateTimeUtils.isBefore(DateTimeUtils.formatDate(partyCreatedOn), DateTimeUtils.formatDate(finKnowledge2023ActualDate));

    if (isPartyCreatedBefore2023) {
        return false;
    }

    return true;

};
