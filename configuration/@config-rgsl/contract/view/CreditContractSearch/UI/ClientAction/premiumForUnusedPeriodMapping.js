'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { creditProductForPremiumForAnyTime, creditProductForPremiumForAfter01_04_2023 } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');


module.exports = function premiumForUnusedPeriodMapping(input, ambientProperties) {

    const resultData = input.data?.resultData;
    const productCode = resultData?.productCode;
    const issueDate = resultData?.issueDate;

    if (
        creditProductForPremiumForAnyTime.includes(productCode) ||
        creditProductForPremiumForAfter01_04_2023.includes(productCode) && DateTimeUtils.isAfterOrEqual(issueDate, '2023-04-01')
    ) {
        // Премия за неиспользованный период =
        //     Страховая премия * (1 - ( (Дата расторжения - дата начала + 1)  /  (дата окончания - дата начала + 2) ) )

        const amount = resultData.amount; // Страховая премия
        const startDate = resultData?.startDate; // дата начала
        const endDate = resultData?.endDate; // дата окончания
        const cancellationDate = new Date(); // Дата расторжения - берем нынешнюю дату

        const unusedPeriodInDays = DateTimeUtils.getDayDifference(cancellationDate, startDate) + 1; // (Дата расторжения - дата начала + 1)
        const allPeriodInDays = DateTimeUtils.getDayDifference(endDate, startDate) + 2; // (дата окончания - дата начала + 2)

        const premiumForUnusedPeriod = amount * (1 - unusedPeriodInDays / allPeriodInDays);
        const formattedPremiumForUnusedPeriod = formatUtils.formatNumberToMoney(round(premiumForUnusedPeriod, 2));

        return formattedPremiumForUnusedPeriod;
    }

    return 0;

};
