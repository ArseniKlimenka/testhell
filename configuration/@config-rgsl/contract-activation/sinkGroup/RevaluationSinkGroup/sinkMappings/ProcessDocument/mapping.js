'use strict';

const { revaluationTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');
const { ZonedDateTime, ZoneOffset } = require('@js-joda/core');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mappingFunction(input, sinkExchange) {
    const pp = sinkExchange.resolveContext('pp');
    if (!pp) {
        return;
    }

    const loadDate = ZonedDateTime.now(ZoneOffset.UTC).toString();
    const result = [];
    const lastData = sinkExchange.resolveContext('lastData');
    const exchangeRates = sinkExchange.resolveContext('exchangeRates');

    for (const ppItem of pp) {

        const exchangeRate = exchangeRates[ppItem.currencyCode];
        const openAmount = ppItem.baseAmount - ppItem.postedAmount;

        const prevItem = lastData.find(_ =>
            _.contractNumber === ppItem.contractNumber &&
            _.dueDate === ppItem.dueDate &&
            _.objectCode === ppItem.objectCode &&
            _.itemNo === ppItem.itemNo);


        const hasChanges = !prevItem
            || prevItem.amount !== ppItem.baseAmount
            || prevItem.openAmount !== openAmount
            || prevItem.exchangeRate !== exchangeRate;

        const revaluationAmountOld = prevItem ? round(openAmount * prevItem.exchangeRate, 2) : undefined;
        const revaluationAmountNew = round(openAmount * exchangeRate, 2);
        const revaluationAmount = revaluationAmountOld ? revaluationAmountNew - revaluationAmountOld : 0;

        if (hasChanges) {
            result.push(({
                loadDate,
                contractNumber: ppItem.contractNumber,
                currencyCode: ppItem.currencyCode,
                dueDate: ppItem.dueDate,
                objectCode: ppItem.objectCode,
                itemNo: ppItem.itemNo,
                amount: ppItem.baseAmount,
                openAmount: openAmount,
                exchangeRate: exchangeRate,
                revaluationAmount: revaluationAmount,
                revaluationTypeId: revaluationTypeIds.PREMIUM,
            }));
        }
    }

    if (result.length === 0) { return; }

    sinkExchange.mapContext('result', result);

    const sequenceParameters = [{
        sequenceName: 'ACC_IMPL.REVALUATION_DATA_ID',
        count: result.length,
        startValueOffset: 1000,
    }];

    return {
        parameters: {
            sequenceParameters: sequenceParameters,
        }
    };
};
