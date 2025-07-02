'use strict';

const { daysCount } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function onChangeInsuranceTermsDays(input, ambientProperties) {

    const basicConditions = input.componentContext;

    if (basicConditions?.insuranceTermsDays?.value == daysCount.year) {

        basicConditions.daysBetweenIssueAndStartDynamic = undefined;
    }

    this.view.validate();
    this.view.reevaluateRules();
    this.view.rebind();
};
