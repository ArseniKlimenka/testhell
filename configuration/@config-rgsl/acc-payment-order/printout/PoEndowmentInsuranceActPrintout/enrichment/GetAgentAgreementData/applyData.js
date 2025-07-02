
module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const aaRecord = dataSourceResponse.data[0].resultData;
        input.mvzNumber = aaRecord.mvzNumber;
        input.orderNumber = aaRecord.orderNumber;
    }
};
