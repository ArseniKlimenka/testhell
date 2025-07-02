const { ZonedDateTime, ZoneOffset } = require('@js-joda/core');

function buildInvoicedCommissionSink(invoicedItems, commType) {
    const invInstallmentLineSatData = [];
    const loadDate = ZonedDateTime.now(ZoneOffset.UTC).toString();

    invoicedItems.forEach(i => {
        invInstallmentLineSatData.push({
            LOAD_DATE: loadDate,
            CONTRACT_NUMBER: i.contractNumber,
            DUE_DATE: i.dueDate,
            POSTING_DATE: i.postingDate,
            OBJECT_CODE: i.objectCode,
            ITEM_NO: i.itemNo,
            CURRENCY_CODE: i.currencyCode,
            BASE_AMOUNT: i.baseAmount,
            AA_COMM_RATE: i.aaCommRate,
            DOC_COMM_RATE: i.docCommRate,
            CALC_COMM_AMOUNT: i.calcCommAmount,
            COMM_TYPE: commType,
        });
    });

    return {
        'PAS_IMPL.P_INVOICED_COMMISSION': invInstallmentLineSatData,
    };
}

module.exports = {
    buildInvoicedCommissionSink,
};
