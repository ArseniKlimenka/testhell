'use static';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}) {

    return {
        businessNumber: originalDocument.number,
        transition: {
            configurationName: originalDocument.configuration.name,
            transitionName: "Activated_to_CancelledByAmendment",
            skipIfNotAvailable: true
        }
    };
};
