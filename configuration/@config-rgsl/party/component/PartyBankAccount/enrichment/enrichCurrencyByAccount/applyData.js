module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const currencyNumericCodeFromNumber = input.number.substring(5, 8);
        input.currency = dataSourceResponse.data.find(item =>
            currencyNumericCodeFromNumber === item.resultData.currencyNumericCode ||
            (item.resultData.currencyNumericCode == "643" && currencyNumericCodeFromNumber == "810")
        )?.resultData;

    }

};
