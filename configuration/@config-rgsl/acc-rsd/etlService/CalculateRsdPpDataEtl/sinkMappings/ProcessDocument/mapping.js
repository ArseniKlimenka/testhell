'use strict';

module.exports = function mappingFunction(input, sinkExchange) {

    const result = [];
    const ppByDate = sinkExchange.resolveContext('ppByDate');
    const lastData = sinkExchange.resolveContext('lastData');

    const dates = Object.keys(ppByDate);
    dates.sort();
    for (const date of dates) {
        const pp = ppByDate[date];

        for (const ppItem of pp) {
            let prevItem = lastData.find(_ =>
                _.contractNumber === ppItem.contractNumber &&
                _.dueDate === ppItem.dueDate &&
                _.objectCode === ppItem.objectCode &&
                _.itemNo === ppItem.itemNo);

            const ppChanged =
                !prevItem ||
                prevItem.postingDate != ppItem.postingDate ||
                prevItem.deadlineDate != ppItem.deadlineDate ||
                prevItem.amount != ppItem.amount ||
                prevItem.openAmount != ppItem.openAmount ||
                prevItem.openAmountNoRsd != ppItem.openAmountNoRsd;

            if (ppChanged) {

                if (!prevItem) {
                    prevItem = {};
                    lastData.push(prevItem);
                }
                Object.assign(prevItem, ppItem);

                result.push(({
                    CONTRACT_NUMBER: ppItem.contractNumber,
                    LOAD_DATE: date,
                    DUE_DATE: ppItem.dueDate,
                    OBJECT_CODE: ppItem.objectCode,
                    ITEM_NO: ppItem.itemNo,
                    EXECUTION_DATE: this.businessContext.etlServiceInput.executionDate,
                    POSTING_DATE: ppItem.postingDate,
                    DEADLINE_DATE: ppItem.deadlineDate,
                    AMOUNT: ppItem.amount,
                    OPEN_AMOUNT: ppItem.openAmount,
                    OPEN_AMOUNT_NO_RSD: ppItem.openAmountNoRsd,
                }));
            }
        }
    }
    sinkExchange.mapContext('result', result);

    if (result.length === 0) { return; }

    const sequenceParameters = [{
        sequenceName: 'ACC_IMPL.RSD_JOB_PP_DATA',
        count: result.length,
        startValueOffset: 1000,
    }];

    return {
        parameters: {
            SequenceParameters: sequenceParameters,
        }
    };
};
