'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { statementReceiveMethod, initiatorType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function onInitiatorChange(input) {

    const currentchangeReason = input.componentContext.changeReason;

    if (currentchangeReason) {

        input.componentContext.changeReason = undefined;
    }

    const initiator = input.componentContext.initiator;

    if (initiator === initiatorType.insurer) {

        input.context.Body.amendmentData.nonFinChangeAmendmentData.applicationInfo.receiveMethod = statementReceiveMethod.office;
        input.context.Body.amendmentData.nonFinChangeAmendmentData.applicationInfo.applicationDate = dateUtils.dateNow();
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
