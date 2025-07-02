const { translationUtils } = require('@adinsure/runtime');
const { toCalendarDate } = require('@config-rgsl/acc-base/lib/excelExportUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        paymentOrderNumber: item.resultData.paymentOrderNumber || '',
        paymentOrderType: translationUtils.getTranslation('dataSource/PODocumentSearchDataSource/1', 'enum', 'paymentOrderType', item.resultData.paymentOrderType ?? '', 'PaymentOrderType') || '',
        paymentOrderDate: toCalendarDate(item.resultData.paymentOrderDate) || '',
        stateCode: item.resultData.stateCode || '',
        recipient: item.resultData.recipient.name || '',
        totalPaymentAmount: item.resultData.totalPaymentAmount || '',
        paymentOrderCurrencyCode: item.resultData.paymentOrderCurrencyCode || '',
        paymentCurrencyCode: item.resultData.paymentCurrencyCode || '',
        paymentDescription: item.resultData.paymentDescription || '',
        isCoolOffPeriod: item.resultData.isCoolOffPeriod == undefined ? '' : item.resultData.isCoolOffPeriod,
        contractNumber: item.resultData.contractNumber || '',
    }));

    return result;
};
