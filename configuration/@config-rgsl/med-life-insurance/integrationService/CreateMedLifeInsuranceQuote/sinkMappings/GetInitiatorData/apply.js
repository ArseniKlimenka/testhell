'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 0) {
        const resultData = sinkResult.data[0].resultData;
        sinkExchange.initiator = {
            employeeCode: resultData.employeeCode,
            userId: resultData.userId,
            userName: resultData.userName,
            partyCode: resultData.partnerCode,
            partyFullName: resultData.partyFullName,
            organisationUnitCode: resultData.organisationUnitCode,
            organisationUnitName: resultData.organisationUnitName
        };
    }
};
