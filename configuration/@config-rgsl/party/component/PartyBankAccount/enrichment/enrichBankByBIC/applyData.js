module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {
        const resultData = dataSourceResponse.data[0].resultData;
        input.bankId = resultData.id;
        input.bankName = resultData.name;
        input.bankCorrespondentAccount = resultData.correspondentAccount;
        input.ftdName = resultData.ftdName;
    }

};
