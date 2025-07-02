const { translationUtils } = require('@adinsure/runtime');
const { toCalendarDate, toCalendarDateTime } = require('@config-rgsl/acc-base/lib/excelExportUtils');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        actId: item.resultData.actId || '',
        actNo: item.resultData.actNo || '',
        actIssueDate: toCalendarDate(item.resultData.actIssueDate) || '',
        aaNumber: item.resultData.aaNumber || '',
        aaPartyType: item.resultData.aaPartyType || '',
        premiumAmount: item.resultData.premiumAmount || '',
        commissionAmount: item.resultData.commissionAmount || '',
        aaServiceProviderName: item.resultData.aaServiceProviderName || '',
        actStateCode: translationUtils.getTranslation('dataSource/CommissionActSearchRgslDataSource/1', 'enum', 'actStateComponent', item.resultData.actStatusId?.toString() ?? '', 'ActStateComponent') || '',
        reportingPeriodFrom: toCalendarDate(item.resultData.reportingPeriodFrom) || '',
        reportingPeriodTo: toCalendarDate(item.resultData.reportingPeriodTo) || '',
        actPayDate: toCalendarDate(item.resultData.actPayDate) || '',
        originalReceiptDate: toCalendarDate(item.resultData.originalReceiptDate) || '',
        aaExternalNumber: item.resultData.aaExternalNumber || '',
        aaCbAgentType: item.resultData.aaCbAgentType || '',
        attrMVZ: item.resultData.attrMVZ || '',
        username: item.resultData.username || '',
        createdDate: toCalendarDateTime(item.resultData.createdDate) || '',
        lastUpdated: toCalendarDateTime(item.resultData.lastUpdated) || '',
        notes: item.resultData.notes ?? '',
    }));

    return result;
};
