
module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    if (!input.tempTechnicalData) {

        input.tempTechnicalData = {};
    }

    input.tempTechnicalData.paticipantsData = dataSource.data.map(_ => ({
        code: _.resultData.partyCode,
        isNonResident: _.resultData.commonBody.attributes?.isNonResident,
    }));
};
