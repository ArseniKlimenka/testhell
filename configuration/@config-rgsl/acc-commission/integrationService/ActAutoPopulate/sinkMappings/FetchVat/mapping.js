'use strict';

module.exports = function (sinkInput, sinkExchange) {
    const act = sinkExchange.resolveContext('act');

    return {
        input: {
            data: {
                criteria: {
                    agentAgreementNumber: act.aaNumber,
                    issueDate: act.actIssueDate,
                }
            }
        }
    };
};
