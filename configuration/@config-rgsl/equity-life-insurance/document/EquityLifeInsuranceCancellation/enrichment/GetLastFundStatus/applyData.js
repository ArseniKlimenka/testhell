module.exports = function (input, dataSourceResponse) {

    const result = dataSourceResponse?.data?.map(r => r.resultData)[0] || {};

    input.technicalData.lastFundStatus = result.fundStatus;
};
