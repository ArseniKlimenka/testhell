'use strict';

const { dateTimeNow } = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (sinkExchange.isNotLimit) {

        return null;
    }

    const isin = sinkInput.isin;
    const contractNumber = sinkInput.contractNumber;
    const amountToReserve = sinkInput.amountToReserve;

    return {
        'PAS_IMPL.ASSET_LIMITS_ACCOUNTING': [
            {
                ISIN: isin,
                CONTRACT_NUMBER: contractNumber,
                AMOUNT: amountToReserve,
                CREATED_DATE: dateTimeNow(),
            }
        ]
    };
};
