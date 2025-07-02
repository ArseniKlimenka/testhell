'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input, sinkExchange) {

    const contractEntity = "Contract";
    const quote = sinkExchange.quote;

    const body = {
        policyIssueDate: input.issueDate,
        lastUpdateDate: DateTimeUtils.dateTimeNow(),
        policy: {
            entity: contractEntity,
            number: input.number,
            originalConfigurationCodeName: input.configurationCodeName,
            originalConfigurationVersion: input.configurationVersion
        },
        quote: {
            entity: contractEntity,
            number: quote?.number,
            originalConfigurationCodeName: quote?.originalConfigurationCodeName,
            originalConfigurationVersion: quote?.originalConfigurationVersion
        }
    };

    return {
        body: body
    };
};
