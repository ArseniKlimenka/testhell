const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function resultMapping(input) {

    const contractNumber = input.CONTRACT_NUMBER;
    const state = input.STATE;
    const futureContractNumber = input.FUTURE_CONTRACT_NUMBER;
    const issueDate = formatHelper.formatDateTimeToString(input.ISSUE_DATE);
    const strategyDescription = input.STRATEGY_DESCRIPTION;
    const purchaseDate = formatHelper.formatDateTimeToString(input.PURCHASE_DATE);
    const isReinvest = input.IS_REINVEST == "1";
    const premium = Number(getValue(input, 'RISK_PREMIUM_ALL', 0));
    const paidPremium = Number(getValue(input, 'PAID_PREMIUM', 0));
    const isPaid = (paidPremium > 0 && paidPremium >= premium) ? 'оплачен' : 'не оплачен';
    const comment = input.COMMENT;

    return {
        contractNumber,
        state,
        futureContractNumber,
        issueDate,
        strategyDescription,
        purchaseDate,
        isReinvest,
        premium,
        paidPremium,
        isPaid,
        comment
    };
};
