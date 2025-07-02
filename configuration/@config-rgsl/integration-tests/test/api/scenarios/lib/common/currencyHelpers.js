const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');

async function getCurrencyInfo(code) {
    const client = new Client();
    const response = await callDataSource('CurrenciesDataSource', {
        paging: undefined,
        criteria: {
            currencySearchText: code,
        },
    }, client);

    const data = response.data;
    if (data.length !== 1) {
        throw 'No currency found!';
    }

    return data[0].resultData;
}

module.exports = {
    getCurrencyInfo,
};
