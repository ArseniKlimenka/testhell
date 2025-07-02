const { LocalDate } = require('@js-joda/core');
const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { toCalendarDate, toDocumentDate } = require('@config-rgsl/acc-base/lib/excelExportUtils');

module.exports = function resultMapping(input, body) {

    const lines = input.data.map((item, index) => {
        const data = item.resultData;
        return {
            lineNo: index + 1,
            actItemId: data.actItemId ? data.actItemId : '',
            referenceNo: data.referenceNo ? data.referenceNo : '',
            polHolderName: data.polHolderName ? data.polHolderName : '',
            paymentTransactionDate: data.paymentTransactionDate ? toCalendarDate(data.paymentTransactionDate) : '',
            polStartDate: data.polStartDate ? toCalendarDate(data.polStartDate) : '',
            paymentDocAmount: data.paymentDocAmount ? data.paymentDocAmount : '',
            docCurrencyCode: data.docCurrencyCode ? data.docCurrencyCode : '',
            insuredYearsCount: data.insuredYearsCount ? data.insuredYearsCount : '',
            commRateFinal: data.commRateFinal ? data.commRateFinal : '',
            lcCommAmountFinal: data.lcCommAmountFinal ? data.lcCommAmountFinal : '',
        };
    });

    const lineProducts = input.data.map(item => item.resultData.productDesc);
    const products = lineProducts.filter(onlyUnique);

    const data = input.data[0].resultData;
    const result = {
        actId: data.actId,
        actNo: data.actNo,
        actIssueDate: toCalendarDate(data.actIssueDate),
        aaNumber: data.aaNumber,
        aaIssueDate: toDocumentDate(data.aaIssueDate),
        aaServiceProviderName: data.aaServiceProviderName,
        reportingPeriodFrom: toDocumentDate(data.reportingPeriodFrom),
        reportingPeriodTo: toDocumentDate(data.reportingPeriodTo),
        commAmountLc: data.commAmountLc,
        commAmountLcMoney: formatUtils.formatNumberToMoney(data.commAmountLc, currency.localCurrency, 2, ',', '.'),
        commAmountLcStr: capitalizeFirstLetter(formatUtils.formatNumberToString(data.commAmountLc, currency.localCurrency)),
        vatAmountLc: data.vatAmountLc,
        vatAmountLcMoney: formatUtils.formatNumberToMoney(data.vatAmountLc, currency.localCurrency, 2, ',', '.'),
        vatAmountLcStr: capitalizeFirstLetter(formatUtils.formatNumberToString(data.vatAmountLc, currency.localCurrency)),
        currentYear: LocalDate.now().year(),
        inn: data.inn ? data.inn : '',
        bankAccount: data.bankAccount ? data.bankAccount : '',
        correspondentAccount: data.correspondentAccount ? data.correspondentAccount : '',
        bic: data.bic ? data.bic : '',
        products: products.join(', '),
        lines: lines,
    };

    return result;
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
