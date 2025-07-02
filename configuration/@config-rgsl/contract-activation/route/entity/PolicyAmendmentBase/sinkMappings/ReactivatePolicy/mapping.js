'use static';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocument
}) {

    if (commonBody.amendment.attributes.amendmentType != 'Reactivation') {
        return null;
    }

    return {
        businessNumber: originalDocument.number,
        transition: {
            configurationName: originalDocument.configuration.name,
            transitionName: "CancelledByAmendment_to_Activated",
            skipIfNotAvailable: true
        }
    };
};
