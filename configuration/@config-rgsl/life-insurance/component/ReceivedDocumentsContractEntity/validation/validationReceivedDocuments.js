/**
 * @errorCode {errorCode} paymentIntermediateApplicationDateIsEmpty
 * @errorCode {errorCode} paymentIntermediateApplicationDateLessIssueDate
 * @errorCode {errorCode} paymentIntermediateApplicationDateMoreCurrentDate
 */

const { dateNow } = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function validationReceivedDocuments(input) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;

    const hasPaymentIntermediateApplication = input.hasPaymentIntermediateApplication ?? false;
    const paymentIntermediateApplicationDate = input.paymentIntermediateApplicationDate;
    if (hasPaymentIntermediateApplication && !paymentIntermediateApplicationDate) {

        validationErrors.push({
            errorCode: "paymentIntermediateApplicationDateIsEmpty",
            errorDataPath: dataPath + '/paymentIntermediateApplicationDate'
        });
    }

    if (paymentIntermediateApplicationDate && paymentIntermediateApplicationDate > dateNow()) {

        validationErrors.push({
            errorCode: "paymentIntermediateApplicationDateMoreCurrentDate",
            errorDataPath: dataPath + '/paymentIntermediateApplicationDate'
        });
    }

    const policyIssueDate = this.businessContext.rootData.policyIssueDate;
    if (paymentIntermediateApplicationDate && paymentIntermediateApplicationDate < policyIssueDate) {

        validationErrors.push({
            errorCode: "paymentIntermediateApplicationDateLessIssueDate",
            errorDataPath: dataPath + '/paymentIntermediateApplicationDate'
        });
    }

    return validationErrors;
};
