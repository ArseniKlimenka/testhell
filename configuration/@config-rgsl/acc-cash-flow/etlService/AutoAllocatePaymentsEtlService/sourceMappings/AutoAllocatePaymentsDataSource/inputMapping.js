const { bankStatementDirection, bankStatementItemStatusId } = require('@config-rgsl/acc-base/lib/bankStatementEnums');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapSinkToDataSource(input) {
    const endDate = dateTimeUtils.newDateAsString();
    const startDate = dateTimeUtils.addMonths(endDate, -6);

    return {
        data: {
            criteria: {
                transactionDateFrom: input.transactionDateFrom ?? startDate,
                direction: bankStatementDirection.INCOMING,
                paymentStatusIds: [ bankStatementItemStatusId.NOT_ALLOCATED, bankStatementItemStatusId.PARTIALLY_ALLOCATED ],
            }
        }
    };
};
