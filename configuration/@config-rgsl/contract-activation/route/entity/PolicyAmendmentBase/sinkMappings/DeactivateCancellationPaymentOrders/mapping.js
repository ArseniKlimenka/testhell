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
        contractNumber: originalDocument.number
    };
};
