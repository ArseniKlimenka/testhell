"use strict";

module.exports = function mapping(input, dataSource) {


    if (dataSource?.data?.length === 0) {

        return;
    }

    if (!input.mainAttributes.applicationInfo) {

        input.mainAttributes.applicationInfo = {};
    }

    const resultData = dataSource.data[0].resultData;

    input.mainAttributes.applicationInfo.applicant = {
        partyCode: resultData.partyCode,
        partyType: resultData.partyType,
        fullName: resultData.commonBody.fullName
    };
};
