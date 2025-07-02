
module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const riskRecord = dataSourceResponse.data[0];
        input.riskName = riskRecord.resultData.riskFullDescription;
    }
};
