const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function resultMapping(input) {
    return {
        contractNumber: input.contract_number,
        amendmentNumber: input.amendment_number,
        contractIssueDate: formatHelper.formatDateTimeToString(input.contract_issue_date),
        amendmentIssueDate: formatHelper.formatDateTimeToString(input.amendment_issue_date),
        contractState: input.contract_state,
        amendmentType: input.amendment_type,
        contractEndDate: formatHelper.formatDateTimeToString(input.contract_end_date),
        policyHolderCode: input.policy_holder_code,
        endowmentPremium: input.endowment_premium ? round(input.endowment_premium, 2) : undefined,
        coolOffPeriodEndDate: formatHelper.formatDateTimeToString(input.cool_off_period_end_date),
        coolOffPeriodEndDatePlus1: formatHelper.formatDateTimeToString(input.cool_off_period_end_date_plus1),
        coolOffPeriodEndDatePlus5: formatHelper.formatDateTimeToString(input.cool_off_period_end_date_plus5),
        unitInitialCost: input.unit_initial_cost ? round(input.unit_initial_cost, 2) : undefined,
        cancellationDate: formatHelper.formatDateTimeToString(input.cancellation_date),
        strategyName: input.strategy_name,
        isin: input.isin,
        share: input.share ? round(input.share, 4) : undefined,
        mf: input.mf ? round(input.mf, 5) : undefined,
    };
};
