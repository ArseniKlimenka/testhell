'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const { LocalDate } = require('@js-joda/core');

module.exports = function mappingFunction(integrationServiceInput) {

    if (integrationServiceInput.paymentOrderType !== paymentOrderType.Claim &&
        (integrationServiceInput.paymentOrderType !== paymentOrderType.PolicyCancellation || !!integrationServiceInput.paymentOrderSubtype)) {

        return;
    }

    const thisYear = LocalDate.now().year();

    let sequenceNameToSet = '';

    if (integrationServiceInput.paymentOrderType == paymentOrderType.Claim &&
        (!integrationServiceInput.paymentOrderSubtype || integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Collective)) {

        sequenceNameToSet = `ACC.PAYMENT_ORDER.INSURANCE_ACT.${thisYear}`;
    }
    else if (integrationServiceInput.paymentOrderType == paymentOrderType.Claim &&
        integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment) {

        sequenceNameToSet = `ACC.PAYMENT_ORDER.INSURANCE_ACT.ENDOWMENT.${thisYear}`;
    }
    else if (integrationServiceInput.paymentOrderType == paymentOrderType.PolicyCancellation &&
        !integrationServiceInput.paymentOrderSubtype) {

        sequenceNameToSet = `ACC.PAYMENT_ORDER.INSURANCE_ACT.AMENDMENT.${thisYear}`;
    }
    else {

        throw 'Unsupported PO subtype!';
    }

    const sequenceParameters = [];
    sequenceParameters.push({ sequenceName: sequenceNameToSet, Count: 1 });

    return {
        parameters: {
            SequenceParameters: sequenceParameters
        }
    };
};
