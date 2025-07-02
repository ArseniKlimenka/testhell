'use strict';

const { dateTimeNow } = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkExchange.reservedByContract == 0) {

        return null;
    }

    const isin = sinkExchange.isin;
    const contractNumber = sinkInput.contractNumber;
    const amountToRelease = - sinkExchange.reservedByContract;

    return {
        'PAS_IMPL.ASSET_LIMITS_ACCOUNTING': [
            {
                ISIN: isin,
                CONTRACT_NUMBER: contractNumber,
                AMOUNT: amountToRelease,
                CREATED_DATE: dateTimeNow(),
            }
        ]
    };
};
