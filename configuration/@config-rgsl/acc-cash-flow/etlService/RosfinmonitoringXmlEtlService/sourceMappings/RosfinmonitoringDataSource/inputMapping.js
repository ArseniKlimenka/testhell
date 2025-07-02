'use strict';

const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapSinkToDataSource(input) {

    const endDate = dateTimeUtils.newDateAsString();
    const startDate = dateTimeUtils.addDays(endDate, -1);

    return {
        data: {
            criteria: {
                amountFrom: 1000000,
                transactionDateFrom: startDate,
                direction: input.direction,
                paymentStatusIds: input.paymentStatusIds,
            }
        }
    };
};
