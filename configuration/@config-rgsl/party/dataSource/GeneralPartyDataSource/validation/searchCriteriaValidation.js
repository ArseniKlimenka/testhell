/**
 * @errorCode {errorCode} AtLeastOneMandatoryDocumentParameter
 */

module.exports = function searchCriteriaValidation(input) {

    const errors = [];

    if (input.isDocClassIdentity && (!input.docTypeCode && !input.docSeries && !input.docNumber)) {
        errors.push({
            errorCode: 'AtLeastOneMandatoryDocumentParameter',
            errorMessage: 'You must choose at least one mandatory document parameter (type code, series, number)!'
        });
    }

    return errors;

};
