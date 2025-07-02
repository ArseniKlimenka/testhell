'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const partiesData = sinkResult.data.map(item => {
        const body = item.resultData.body;
        const commonBody = item.resultData.commonBody;

        return {
            code: item.resultData.partyCode,
            fullName: commonBody.fullName,
            partyExcludedPersons: body.partyExcludedPersons?.map(_ => _.excludedPersonName),
            partyTaxResidencies: body.partyTaxResidencies?.map(_ => ({ residenceCountry: { countryCode: _.excludedPersonName } })),
            startDate: commonBody.startDate,
            endDate: commonBody.endDate,
        };
    });

    sinkExchange.foundPartiesData = partiesData;
};
