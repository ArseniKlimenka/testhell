'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const issueFormCode = sinkExchange.resolveContext('issueFormCode');
    const isEPolicy = issueFormCode == 'ePolicy';

    if (!isEPolicy) { return; }

    return {
        entityId: sinkInput.contractId,
        attachmentType: 'servicesMemo'
    };

};
