'use strict';

const { changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function commissionPeriodCheck(input) {

    const finChngeEffectiveDate = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentEffectiveDate;
    const isCommissionRateEdit = input.rootContext.Body.amendmentData?.finChangeAmendmentData?.mainAttributes?.changeTypes?.some(item => item === changeTypes.commissionRateEdit);
    const thereArePeriodsMoreEarlyThanAmendment = input.actionData.selection?.added?.some(item => Date.parse(item.periodStartDate) < Date.parse(finChngeEffectiveDate));

    if (isCommissionRateEdit && thereArePeriodsMoreEarlyThanAmendment) {
        throw 'Среди выбранных периодов есть такие, у которых дата начала более ранняя, чем дата вступления в силу документа. Это приведет к ошибке валидации.';
    }
};
