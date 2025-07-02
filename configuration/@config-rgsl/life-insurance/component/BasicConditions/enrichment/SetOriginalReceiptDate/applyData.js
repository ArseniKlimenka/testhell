const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { LocalDateTime } = require('@js-joda/core');
const { issueForm } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(input) {
    const body = this.businessContext.rootData;
    const issueFormCode = body?.issueForm?.code?.issueFormCode;

    // Не убирать, закомментировано для временного скрытия функционала
    // if (issueFormCode && (issueFormCode === issueForm.ePolicy.issueFormCode || issueFormCode === issueForm.offer.issueFormCode)) {
    //     body.basicConditions.originalReceiptDate = dateTimeUtils.formatDate(LocalDateTime.now());
    // }
};
