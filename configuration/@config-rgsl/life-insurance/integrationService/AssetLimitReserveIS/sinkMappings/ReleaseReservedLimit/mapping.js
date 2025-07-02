'use strict';

const { dateTimeNow } = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const limit = sinkInput.limit;
    const reservedByAsset = sinkExchange.reservedByAsset;
    const reservedByContract = sinkExchange.reservedByContract;
    const amountToReserve = sinkInput.amountToReserve;

    const currentUserRoles = this.applicationContext.user.applicationRoles;
    const isSkipCheckAvailableLimit = currentUserRoles.some(_ => _ == 'SkipCheckAssetAvailableLimit');

    if ((reservedByAsset - reservedByContract + amountToReserve) > limit && !isSkipCheckAvailableLimit) {
        sinkExchange.isNotLimit = true;

        return null;
    }

    if (reservedByContract == 0) {
        return null;
    }

    const isin = sinkInput.isin;
    const contractNumber = sinkInput.contractNumber;

    return {
        'PAS_IMPL.ASSET_LIMITS_ACCOUNTING': [
            {
                ISIN: isin,
                CONTRACT_NUMBER: contractNumber,
                AMOUNT: - reservedByContract,
                CREATED_DATE: dateTimeNow(),
            }
        ]
    };
};
