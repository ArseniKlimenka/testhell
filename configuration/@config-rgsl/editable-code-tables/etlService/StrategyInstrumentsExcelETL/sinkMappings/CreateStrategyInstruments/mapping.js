module.exports = function mapping(input) {
    const { data } = input;

    const productCodes = [data?.productCode];
    productCodes.push();

    const strategyInstrumentsBody = {
        strategyInstruments: {
            productCodes,
            strategyCode: data?.strategyCode,
            issueDateMin: data?.issueDateMin,
            issueDateMax: data?.issueDateMax,
            strategyDescriptionFull: data?.strategyDescriptionFull,
            purchaseDate: data?.purchaseDate,
            dischargeDate: data?.dischargeDate,
            didBeginDate: data?.didBeginDate,
            didEndDate: data?.didEndDate,
            couponPeriods: eval(data?.couponPeriods) || [],
            windowStartDate: data?.windowStartDate,
            windowEndDate: data?.windowEndDate
        }
    };

    return {
        body: strategyInstrumentsBody
    };
};
