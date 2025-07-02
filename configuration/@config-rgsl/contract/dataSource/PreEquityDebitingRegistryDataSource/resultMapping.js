const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function resultMapping(input) {
    const preEquityDebitingRegistryDate = this.businessContext.data.criteria.preEquityDebitingRegistryDate;

    return {
        contractNumber: input.contract_number,
        portfolioName: input.portfolio_name,
        amendmentNumber: input.amendment_number,
        amendmentType: input.amendment_type,
        netAssetsAmount: input.netAssetsAmount ? round(input.netAssetsAmount, 2) : undefined,
        reportDate: preEquityDebitingRegistryDate
    };
};
