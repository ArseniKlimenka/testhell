'use strict';

const {
    newGuid,
    replaceNullWithUndefined,
    readyForDatabaseString,
    readyForDatabaseInt,
    readyForDatabaseFloat,
} = require('@config-rgsl/acc-base/lib/excelFileLoaderHelper');

const {
    stringAttributesArr,
    intAttributesArr,
    floatAttributesArr,
} = require('@config-rgsl/life-insurance/lib/fundAssetsHelper');

module.exports = function resultMapping(input) {

    input = replaceNullWithUndefined(input);

    readyForDatabaseString(input, stringAttributesArr, this, true);
    readyForDatabaseInt(input, intAttributesArr, this);
    readyForDatabaseFloat(input, floatAttributesArr, this);

    const reportDate = this.businessContext.data.reportDate;

    const data = {
        excelRowNumber: input.$rowNumber,
        rowNumber: input.rowNumber,
        documentNumber: input.documentNumber,
        assetType: input.assetType,
        assetName: input.assetName,
        isin: input.isin,
        assetCurrentShare: input.assetCurrentShare,
        assetPurchasePriceAvg: input.assetPurchasePriceAvg,
        stockPurchasedNumber: input.stockPurchasedNumber,
        assetAmountOnPurchaseTime: input.assetAmountOnPurchaseTime,
        assetPriceOnGenerationReportDate: input.assetPriceOnGenerationReportDate,
        assetsAmountOnGenerationReportDate: input.assetsAmountOnGenerationReportDate,
        couponRate: input.couponRate,
        accumulatedCouponIncome: input.accumulatedCouponIncome,
        reportDate: reportDate,
    };

    return {
        data: data,
        $recordKey: newGuid(),
    };
};
