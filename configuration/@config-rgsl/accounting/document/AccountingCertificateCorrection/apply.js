'use strict';

module.exports = function apply(document, input, sourceOrPreviousBusinessVersionCommonBody) {

    const originalDocument = Object.assign({}, document);
    const originalComment = originalDocument.comment;
    const appliedVersion = Object.assign(originalDocument, input);
    appliedVersion.comment = originalComment;

    return appliedVersion;
};
