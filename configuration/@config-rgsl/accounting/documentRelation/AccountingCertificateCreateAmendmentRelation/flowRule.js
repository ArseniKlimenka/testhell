const { isPolicyNotCancelled, canAmendmentBeCreated, documentHasCancelledAmendment } = require('@config-rgsl/infrastructure/lib/amendmentUtilsCommon');

/**
 * @errorCode {errorCode} previousAmendmentInProgress, hasLatestDiscardedVersion
 */

module.exports = function rule(input) {

    const validationErrors = [];
    const hasDiscardedVersion = documentHasCancelledAmendment(this.businessContext);
    const canCreateAmendment = isPolicyNotCancelled(input) && canAmendmentBeCreated(this.businessContext);

    if (hasDiscardedVersion) {
        validationErrors.push({
            errorCode: 'hasLatestDiscardedVersion'
        });
    }

    if (!canCreateAmendment) {
        validationErrors.push({
            errorCode: 'previousAmendmentInProgress'
        });
    }

    return validationErrors;
};
