'use strict';

const { revaluationTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mappingFunction(input, sinkExchange) {
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    if (policyInfos.length === 0) {
        return;
    }

    const lastInvoicedCommission = sinkExchange.resolveContext('lastInvoicedCommission');
    const lastData = sinkExchange.resolveContext('lastData');
    const exchangeRates = sinkExchange.resolveContext('exchangeRates');
    const dueDateExchangeRates = sinkExchange.resolveContext('dueDateExchangeRates');
    const loadDate = sinkExchange.resolveContext('loadDate');

    const result = [];

    for (const ic of lastInvoicedCommission) {

        const policyInfo = policyInfos.find(_ => _.contractNumber = ic.contractNumber);
        const exchangeRate = exchangeRates[policyInfo.currencyCode];
        const dueDateExchangeRate = dueDateExchangeRates[policyInfo.currencyCode][ic.dueDate];
        const newAmount = ic.calcCommAmount;

        const prevItem = lastData.find(_ =>
            _.contractNumber === ic.contractNumber &&
            _.dueDate === ic.dueDate &&
            _.objectCode === ic.objectCode &&
            _.itemNo === ic.itemNo);

        let prevAmount;
        let prevExchangeRate;
        if (!prevItem) {
            prevAmount = newAmount;
            prevExchangeRate = dueDateExchangeRate;
        } else {
            prevAmount = prevItem.openAmount;
            prevExchangeRate = prevItem.exchangeRate;
        }

        const hasChanges = prevAmount !== newAmount || prevExchangeRate !== exchangeRate;

        if (hasChanges) {
            const revaluationAmountOld = round(newAmount * prevExchangeRate, 2);
            const revaluationAmountNew = round(newAmount * exchangeRate, 2);
            const revaluationAmount = revaluationAmountNew - revaluationAmountOld;

            result.push(({
                loadDate,
                contractNumber: ic.contractNumber,
                currencyCode: policyInfo.currencyCode,
                dueDate: ic.dueDate,
                objectCode: ic.objectCode,
                itemNo: ic.itemNo,
                amount: 0,
                openAmount: newAmount,
                exchangeRate: exchangeRate,
                revaluationAmount: revaluationAmount,
                revaluationTypeId: revaluationTypeIds.INVOICED_COMMISSION,
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
