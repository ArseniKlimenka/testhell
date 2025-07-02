'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const result = sinkExchange.resolveContext('result');
    if (!result) {
        return;
    }

    return {
        'ACC_IMPL.REVALUATION_DATA': result.map(_ => ({
            REVALUATION_DATA_ID: _.id,
            LOAD_DATE: _.loadDate,
            CONTRACT_NUMBER: _.contractNumber,
            DUE_DATE: _.dueDate,
            OBJECT_CODE: _.objectCode,
            ITEM_NO: _.itemNo,
            AMOUNT: _.amount,
            OPEN_AMOUNT: _.openAmount,
            EXCHANGE_RATE: _.exchangeRate,
            REVALUATION_AMOUNT: _.revaluationAmount,
            REVALUATION_TYPE_ID: _.revaluationTypeId,
        })),
    };
};
