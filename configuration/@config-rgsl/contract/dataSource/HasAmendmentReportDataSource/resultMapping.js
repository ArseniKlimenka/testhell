const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {

    const contractNumber = input.CONTRACT_NUMBER;
    const issueDate = formatHelper.formatDateTimeToString(input.ISSUE_DATE);
    const hasAmendment = input.HAS_AMENDMENT == 1 ? 'Да' : 'Нет';
    const hasAmendmentDate = formatHelper.formatDateTimeToString(input.HAS_AMENDMENT_DATE);

    return {
        contractNumber,
        issueDate,
        hasAmendment,
        hasAmendmentDate
    };
};
