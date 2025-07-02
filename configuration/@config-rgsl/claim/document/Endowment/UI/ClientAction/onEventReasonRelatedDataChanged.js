'use strict';

const { insuredEventReasons, endowmentPaymentLineType } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = async function onEventReasonRelatedDataChanged(input, ambientProperties) {

    const eventReason = input.context.Body.mainAttributes?.eventReason?.code;
    const selectedRisk = input.context.Body.mainAttributes.selectedRisk;

    if (eventReason !== insuredEventReasons.contractEnd.code) {

        const paymentLines = input.context.Body.endowmentAmounts.paymentLines || [];
        const pitLine = paymentLines.find(item => item.lineType === endowmentPaymentLineType.PIT);
        const beneficiaries = input.context.Body.endowmentBeneficiaries || [];

        if (pitLine) {

            pitLine.lineAmountInContractCurrency = 0;
            pitLine.lineAmountInRubCurrency = 0;
        }

        beneficiaries.forEach(item => { delete item.pitAmount; delete item.pitAmountInRubCurrency; });
    }

    if (eventReason === insuredEventReasons.contractEnd.code && selectedRisk) {

        input.context.Body.mainAttributes.applicationInfo.eventDate = selectedRisk.endDate;
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
