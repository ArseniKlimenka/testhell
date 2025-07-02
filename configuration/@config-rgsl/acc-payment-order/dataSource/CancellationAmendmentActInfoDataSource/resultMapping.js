'use strict';

module.exports = function resultMapping(input) {

    const stateHistoryResult = getDataSourceResult(input, 'CancellationAmendmentStateHistoryDataSource');
    const inquiriesResult = getDataSourceResult(input, 'CancellationInquiriesFullDataSource');

    const result = {
        riskCode: input.resultData.riskCode,
        stateHistoryResult: stateHistoryResult.map(r => {
            return {
                validFrom: r.validFrom,
                validFromWithTime: r.validFromWithTime,
                transition: r.transition,
                stateCode: r.stateCode,
                state: r.state,
                changedByUser: r.changedByUser,
                changedByParty: r.changedByParty,
                changedByPartyCode: r.changedByPartyCode,
                documentNumber: r.documentNumber
            };
        }),
        inquiriesResult: inquiriesResult.map(r => {
            return {
                inquiryId: r.inquiryId,
                inquiryNumber: r.inquiryNumber,
                createdOn: r.createdOn,
                updatedOn: r.updatedOn,
                createdOnSystemFormat: r.createdOnSystemFormat,
                updatedOnSystemFormat: r.updatedOnSystemFormat,
                state: r.state,
                stateCode: r.stateCode,
                departmentCodeName: r.departmentCodeName,
                departmentCodeDescription: r.departmentCodeDescription,
                changedByUser: r.changedByUser,
                changedByParty: r.changedByParty,
                changedByPartyCode: r.changedByPartyCode,
                changedOn: r.changedOn
            };
        })
    };

    return result;
};

function getDataSourceResult(input, dataSourceName) {

    return input.additionalDataSources.find(_ => _.dataSourceName === dataSourceName).response.data.map(_ => _.resultData);
}
