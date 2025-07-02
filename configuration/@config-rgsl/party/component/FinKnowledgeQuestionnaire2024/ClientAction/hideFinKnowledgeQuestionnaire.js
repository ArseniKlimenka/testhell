'use strict';

const { finKnowledge2023ActualDate, finKnowledge2024ActualDate } = require('@config-rgsl/party/lib/partyQuestionnairesConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function hideFinKnowledgeQuestionnaire(input, ambientProperties) {

    const partyCreatedOn = input?.context?.AuditInfo?.CreatedOn;
    const isPartyCreatedBefore2024 = DateTimeUtils.isAfter(DateTimeUtils.formatDate(partyCreatedOn), DateTimeUtils.formatDate(finKnowledge2024ActualDate));

    // temp solution
    // if (isPartyCreatedBefore2024) {
    //     return false;
    // }

    return false;

};
