'use strict';

module.exports = function mapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    sequenceNumber,
    versionState
}) {

    const productCodesList = body?.strategyInstruments?.productCodes || [];
    const strategyCode = body?.strategyInstruments?.strategyCode;
    const issueDateMin = body?.strategyInstruments?.issueDateMin;
    const issueDateMax = body?.strategyInstruments?.issueDateMax;
    const strategyDescriptionFull = body?.strategyInstruments?.strategyDescriptionFull;
    const purchaseDate = body?.strategyInstruments?.purchaseDate;
    const dischargeDate = body?.strategyInstruments?.dischargeDate;
    const didBeginDate = body?.strategyInstruments?.didBeginDate;
    const didEndDate = body?.strategyInstruments?.didEndDate;
    const couponPeriods = JSON.stringify(body?.strategyInstruments?.couponPeriods);
    const windowStartDate = body?.strategyInstruments?.windowStartDate;
    const windowEndDate = body?.strategyInstruments?.windowEndDate;

    const strategyInstrumentsSat = [{
        $deleted: true,
        STRATEGY_INSTRUMENT_NUMBER: number
    }];

    productCodesList.map(productCode => {
        strategyInstrumentsSat.push({
            PRODUCT_CODE: productCode,
            STRATEGY_INSTRUMENT_NUMBER: number,
            STRATEGY_CODE: strategyCode,
            ISSUE_DATE_MIN: issueDateMin,
            ISSUE_DATE_MAX: issueDateMax,
            STRATEGY_DESCRIPTION_FULL: strategyDescriptionFull,
            PURCHASE_DATE: purchaseDate,
            DISCHARGE_DATE: dischargeDate,
            DID_BEGIN_DATE: didBeginDate,
            DID_END_DATE: didEndDate,
            COUPON_PERIODS: couponPeriods,
            WINDOW_START_DATE: windowStartDate,
            WINDOW_END_DATE: windowEndDate
        });
    });

    return {
        'PAS_IMPL.STRATEGY_INSTRUMENTS_HUB': [{
            STRATEGY_INSTRUMENT_NUMBER: number
        }],
        'PAS_IMPL.STRATEGY_INSTRUMENTS_SAT': strategyInstrumentsSat
    };

};
