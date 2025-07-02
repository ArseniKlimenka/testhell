module.exports = function resultMapping(input) {

    return {
        rsdItemHkeys: JSON.parse(input.RSD_ITEM_HKEYS),
        contractNumber: input.CONTRACT_NUMBER,
        contractConfigurationName: input.CONTRACT_CONFIGURATION_NAME,
        contractConfigurationVersion: input.CONTRACT_CONFIGURATION_VERSION,
        holderName: input.HOLDER_NAME,
        currencyCode: input.CURRENCY_CODE,
        itemNo: input.ITEM_NO,
        dueDate: input.DUE_DATE,
        openAmount: input.OPEN_AMOUNT,
        openAmountNoRsd: input.OPEN_AMOUNT_NO_RSD,
        deadlineDate: input.DEADLINE_DATE,
        overdueDays: input.OVERDUE_DAYS,
        rsdRate: input.RSD_RATE,
        rsdAmount: input.RSD_AMOUNT,
        rsdAmountManual: input.RSD_AMOUNT_MANUAL,
    };
};
