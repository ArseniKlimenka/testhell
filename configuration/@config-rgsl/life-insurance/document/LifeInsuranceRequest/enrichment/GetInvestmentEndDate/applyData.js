module.exports = function (input, dataSourceResponse) {

    const result = dataSourceResponse?.data?.map(r => r.resultData)[0] || {};

    input.contract.investmentEndDate = result.investmentEndDate;
};
