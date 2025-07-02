
module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const bankRecord = dataSourceResponse.data[0].resultData;
        input.recipientBankName = bankRecord.name;

    }
};
