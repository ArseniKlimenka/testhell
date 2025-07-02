const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function showCreditRateRefuse(input) {

    const body = input.context.Body;
    const creditProgramId = getValue(body, 'creditProgram.creditProgramId');
    const issueDate = getValue(body, 'basicConditions.issueDate');

    const isAfterOrEqual20221001 = DateTimeUtils.isAfterOrEqual(DateTimeUtils.formatDate(issueDate), DateTimeUtils.formatDate('2022-10-01'));
    const is08or36 = ['РЖ08', 'РЖ36'].includes(creditProgramId);

    return isAfterOrEqual20221001 && is08or36;

};
