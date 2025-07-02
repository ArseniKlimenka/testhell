const dateTimeUtils = require("@config-rgsl/infrastructure/lib/DateTimeUtils");

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {
    const contractNumbers = input.resultData.map(_ => _.contractNumber);
    if (contractNumbers.length === 0) {
        return;
    }

    const periodFirstOpenDate = additionalDataSourcesResults.GetPeriodFirstOpenDateDataSource.data.firstOpenDate;
    const aaAmStartDate = this.businessContext.etlServiceInput.aaAmendmentStartDate;
    const dateFrom = dateTimeUtils.getMaxDate(aaAmStartDate, periodFirstOpenDate);

    const chunkSize = 1000;
    const result = [];

    for (let i = 0; i < contractNumbers.length; i += chunkSize) {
        const chunk = contractNumbers.slice(i, i + chunkSize);

        result.push({
            contracts: chunk.map(_ => ({
                contractNumber: _,
                repostFromDate: dateFrom,
            })),
        });
    }

    return result;
};
