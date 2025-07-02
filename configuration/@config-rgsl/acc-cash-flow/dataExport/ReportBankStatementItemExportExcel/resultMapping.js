const { translationUtils } = require('@adinsure/runtime');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        bankStatementItemId: item.resultData.bankStatementItemId,
        bankStatementItemNo: item.resultData.bankStatementItemNo,
        incomeSourceId: item.resultData.incomeSourceId,
        description: item.resultData.description || '',
        originalDescription: item.resultData.originalDescription || '',
        transactionDate: item.resultData.transactionDate && dateTimeUtils.formatDate(item.resultData.transactionDate, 'ISO'),
        createDate: item.resultData.createDate,
        paymentDate: item.resultData.paymentDate && dateTimeUtils.formatDate(item.resultData.paymentDate, 'ISO'),
        amount: item.resultData.amount,
        direction: translationUtils.getTranslation('dataSource/BankStatementItemReportDataSource/1', 'enum', 'directionComponent', item.resultData.direction?.toString() ?? '', 'DirectionComponent') || '',
        currencyCode: item.resultData.currencyCode,
        paymentStatus: translationUtils.getTranslation('dataSource/BankStatementItemReportDataSource/1', 'enum', 'paymentStatusComponent', item.resultData.paymentStatusId?.toString() ?? '', 'PaymentStatusComponent') || '',
        openAmount: item.resultData.openAmount || '',
        documentNo: item.resultData.documentNo || '',
        dueDate: item.resultData.dueDate && dateTimeUtils.formatDate(item.resultData.dueDate, 'ISO') || '',
        allocatedAmount: item.resultData.allocatedAmount || '',
        isRegistry: item.resultData.isRegistry,
        isAcquiring: item.resultData.isAcquiring,
        nonAcceptance: item.resultData.nonAcceptance,
        segment: item.resultData.segment || '',
        debtorName: item.resultData.debtorName || '',
        debtorAccountNo: item.resultData.debtorAccountNo || '',
        creditorName: item.resultData.creditorName || '',
        creditorAccountNo: item.resultData.creditorAccountNo || '',
        paymentSourceId: translationUtils.getTranslation('dataSource/BankStatementItemReportDataSource/1', 'enum', 'bankStatementItemSourceIdComponent', item.resultData.paymentSourceId?.toString() ?? '', 'BankStatementItemSourceIdComponent') || '',
        rgslGuid: item.resultData.rgslGuid || '',
        registryFileFormat: translationUtils.getTranslation('masterEntity/BsiRegistryType/1', 'localized-field', 'fileFormatName', item.resultData.registryFileFormat?.toString()) || ''
    }));

    return result;
};
