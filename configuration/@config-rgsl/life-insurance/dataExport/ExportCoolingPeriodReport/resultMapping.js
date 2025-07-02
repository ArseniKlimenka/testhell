'use strict';

const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const emptyText = '';

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            bankBic: item.resultData.bankBic || emptyText,
            bankCorrespondentAccount: item.resultData.bankCorrespondentAccount || emptyText,
            bankAccountNumber: item.resultData.bankAccountNumber || emptyText,
            payAmountSum: item.resultData.payAmountSum || emptyText,
            contractSeries: item.resultData.contractSeries || emptyText,
            contractNumber: item.resultData.contractNumber || emptyText,
            closeDate: item.resultData.closeDate ? formatHelper.formatDateTimeToString(item.resultData.closeDate) : emptyText
        };
    });

    return result;

};
