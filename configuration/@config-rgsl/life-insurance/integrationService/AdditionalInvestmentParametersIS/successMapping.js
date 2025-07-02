'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        coolOffPeriodEnd: sinkExchange.coolOffPeriodEnd,
        workCalendarSortedByPeriod: sinkExchange.workCalendarSortedByPeriod,
        workCalendarInCoolOffPeriod: sinkExchange.workCalendarInCoolOffPeriod,
        workCalendarAfterCoolOffPeriod: sinkExchange.workCalendarAfterCoolOffPeriod,
        lastCoolOffPeriodDay: sinkExchange.lastCoolOffPeriodDay,
        isWeekendLastCoolOffPeriodDay: sinkExchange.isWeekendLastCoolOffPeriodDay,
        workingDaysAfterCoolPeriod: sinkExchange.workingDaysAfterCoolPeriod,
        firstWorkingDayAfterCoolPeriod: sinkExchange.firstWorkingDayAfterCoolPeriod,
        firstWorkingDateAfterCoolPeriod: sinkExchange.firstWorkingDateAfterCoolPeriod,
        firstWorkingDayAfterCoolOffPeriod: sinkExchange.firstWorkingDayAfterCoolOffPeriod,
        firstWorkingDateAfterCoolOffPeriod: sinkExchange.firstWorkingDateAfterCoolOffPeriod,
        firstWorkingDayAfterNumOfWorkDaysToInvest: sinkExchange.firstWorkingDayAfterNumOfWorkDaysToInvest,
        firstWorkingDateAfterNumOfWorkDaysToInvest: sinkExchange.firstWorkingDateAfterNumOfWorkDaysToInvest,
        rateOfReturnRulesEquityActives: sinkExchange.rateOfReturnRulesEquityActives,
        rateOfReturnEquityActives: sinkExchange.rateOfReturnEquityActives,
        commWithdrawalFundsArray: sinkExchange.commWithdrawalFundsArray,
    };
};
