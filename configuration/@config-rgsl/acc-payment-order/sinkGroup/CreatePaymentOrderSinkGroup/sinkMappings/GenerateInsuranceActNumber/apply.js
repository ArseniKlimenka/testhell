'use strict';

const { paymentOrderType, paymentOrderSubType } = require("@config-rgsl/acc-base/lib/paymentOrderConst");
const {LocalDate} = require('@js-joda/core');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const ids = sinkResult[0].ids;
    let sequenceNumber = ids[0].toString();
    const zeroCount = 9 - sequenceNumber.length;
    sequenceNumber = sequenceNumber.padStart(zeroCount, '0');

    const thisYear = LocalDate.now().year();
    const integrationServiceInput = sinkExchange.integrationServiceInput;

    if (integrationServiceInput.paymentOrderType == paymentOrderType.Claim && !integrationServiceInput.paymentOrderSubtype) {

        sinkExchange.insuranceActNumber = `СА-У${sequenceNumber}-${thisYear}`;
    }
    else if (integrationServiceInput.paymentOrderType == paymentOrderType.Claim && integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Collective) {

        sinkExchange.insuranceActNumber = `СА-У${sequenceNumber}-${thisYear}`;
    }
    else if (integrationServiceInput.paymentOrderType == paymentOrderType.Claim && integrationServiceInput.paymentOrderSubtype === paymentOrderSubType.Endowment) {

        sinkExchange.insuranceActNumber = `СА-ДОЖ${sequenceNumber}-${thisYear}`;
    }
    else if (integrationServiceInput.paymentOrderType == paymentOrderType.PolicyCancellation && !integrationServiceInput.paymentOrderSubtype) {

        sinkExchange.insuranceActNumber = `СА-Р${sequenceNumber}-${thisYear}`;
    }
    else {

        throw 'Unsupported PO subtype!';
    }
};
