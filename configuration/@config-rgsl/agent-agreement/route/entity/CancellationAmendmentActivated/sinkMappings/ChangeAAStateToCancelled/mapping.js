'use static';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody
}, sinkExchange) {

    return {
        businessNumber: body.amendmentData.cancellationAmendmentData.sourceDocumentNumber,
        transition: {
            configurationName: "AgentAgreement",
            transitionName: "ActivatedToCancelled",
            skipIfNotAvailable: true
        }
    };
};
