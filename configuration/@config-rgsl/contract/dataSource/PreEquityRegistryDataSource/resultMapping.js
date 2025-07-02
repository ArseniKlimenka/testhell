const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {
    return {
        contractNumber: input.contract_number,
        portfolioName: input.portfolio_name,
        amendmentNumber: input.amendment_number,
        amendmentType: input.amendment_type,
        endowmentPremium: input.endowment_premium ? round(input.endowment_premium, 2) : undefined,
        coolOffPeriodEndDatePlus1: formatHelper.formatDateTimeToString(input.cool_off_period_end_date_plus1)
    };
};
