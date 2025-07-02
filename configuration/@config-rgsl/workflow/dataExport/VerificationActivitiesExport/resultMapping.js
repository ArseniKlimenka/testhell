const { emptyToString } = require('@config-rgsl/infrastructure/lib/ImportLoaderExcelParser');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { businessClock } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        businessNumber: emptyToString(item.resultData.businessNumber),
        contractNumber: emptyToString(item.resultData.contractNumber),
        issueDate: emptyDateToString(item.resultData.issueDate),
        holderName: emptyToString(item.resultData.holderName),
        holderBirthDate: emptyToString(item.resultData.holderName),
        paymentFrequencyName: emptyToString(item.resultData.paymentFrequencyName),
        productGroup: emptyToString(item.resultData.productGroup),
        productName: emptyToString(item.resultData.productName),
        partnerName: emptyToString(item.resultData.partnerName),
        assignee: item.resultData.groupName ? item.resultData.groupName : emptyToString(item.resultData.assigneeName),
        documentStateLocalized: emptyToString(item.resultData.documentStateLocalized),
        activityStatusLocalized: emptyToString(item.resultData.activityStatusLocalized),
        createdDate: emptyToString(businessClock.convertFromUTCToBusinessTime(item.resultData.createdDate)),
        closedDate: emptyToString(item.resultData.closedDate),
        startDate: emptyDateToString(item.resultData.startDate),
        endDate: emptyDateToString(item.resultData.endDate),
        contractState: emptyToString(item.resultData.contractState),
        holderAge: emptyToString(item.resultData.holderAge)
    }));

    return result;
};

function emptyDateToString(inputDate) {
    const result = emptyToString(inputDate);
    if (result === '') {
        return result;
    }
    return DateTimeUtils.formatDate(result, 'dd.MM.yyyy');

}
