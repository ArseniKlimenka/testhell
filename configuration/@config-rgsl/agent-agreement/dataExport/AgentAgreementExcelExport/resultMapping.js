const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input, body) {

    const lines = input.data.map((item) => {
        const vatRate = item.resultData.vatRates
            ?.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
            .find(rate => new Date(rate.startDate) <= new Date())
            ?.vatRate || item.resultData.vatRates?.[0]?.vatRate;

        return {
            "externalNumber": item.resultData.externalNumber ?? '',
            "documentNumber": item.resultData.documentNumber ?? '',
            "agentNameShort": item.resultData.agentNameShort ?? '',
            "startDate": item.resultData.startDate ? DateTimeUtils.formatDate(item.resultData.startDate, DateTimeUtils.DateFormats.CALENDAR) : '',
            "endDate": item.resultData.endDate ? DateTimeUtils.formatDate(item.resultData.endDate, DateTimeUtils.DateFormats.CALENDAR) : '',
            "conclusionDate": item.resultData.conclusionDate ? DateTimeUtils.formatDate(item.resultData.conclusionDate, DateTimeUtils.DateFormats.CALENDAR) : '',
            "documentState": item.resultData.documentState ?? '',
            "agency": item.resultData.agency ?? '',
            "salesChannelName": item.resultData.salesChannelName ?? '',
            "agentPartyType": item.resultData.isPersonalBusiness ? 'ИП' : item.resultData.agentPartyType ?? '',
            "agentPersonalNumber": item.resultData.agentPersonalNumber ?? '',
            "cbAgentType": item.resultData.cbAgentType ?? '',
            "INNKIO": item.resultData.INNKIO ?? '',
            "SNILS": item.resultData.SNILS ?? '',
            "websiteAddress": item.resultData.websiteAddress ?? '',
            "isTechnical": item.resultData.isTechnical ? 'Да' : 'Нет',
            "salesClassification": item.resultData.salesClassification ?? '',
            "mvzNumber": item.resultData.mvzNumber ?? '',
            "orderNumber": item.resultData.orderNumber ?? '',
            "vatRate": vatRate ?? ''
        };
    });

    const result = {

        lines: lines
    };

    return result;
};
