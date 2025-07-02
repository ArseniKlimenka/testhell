'use strict';

const { invoicedCommissionTypeIds } = require('@config-rgsl/acc-base/lib/accConsts');
const { buildInvoicedCommissionSink } = require('@config-rgsl/contract-activation/lib/sinkMappingHelperInvoicedCommission');
const { compareByObjectProperties } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function mapping(input, sinkExchange) {
    const act = sinkExchange.resolveContext('act');
    const actItems = sinkExchange.resolveContext('actItems');
    const policyInfos = sinkExchange.resolveContext('policyInfos');
    const paymentPlan = sinkExchange.resolveContext('paymentPlan');

    const fields = [
        'referenceNo',
        'sourceLineId',
        'invCommDocAmount',
    ];
    const newInvoicedCommission = [];

    actItems.sort(compareByObjectProperties(fields));

    for (const actItem of actItems) {

        const policyInfo = policyInfos.find(_ => _.contractNumber === actItem.referenceNo);
        const ppItem = paymentPlan.find(_ => _.contractNumber === actItem.referenceNo && _.dueDate === actItem.dueDate);

        const request = {
            contractNumber: policyInfo.contractNumber,
            dueDate: actItem.dueDate,
            postingDate: ppItem.postingDate,
            objectCode: ppItem.objectCode,
            itemNo: actItem.sourceLineId,
            currencyCode: policyInfo.currencyCode,
            baseAmount: actItem.paymentDocAmount * input.sign,
            aaCommRate: actItem.aaCommRate,
            docCommRate: actItem.docCommRate,
            calcCommAmount: actItem.invCommDocAmount * input.sign,
        };

        newInvoicedCommission.push(request);
    }

    return buildInvoicedCommissionSink(newInvoicedCommission, invoicedCommissionTypeIds.VOID);
};
