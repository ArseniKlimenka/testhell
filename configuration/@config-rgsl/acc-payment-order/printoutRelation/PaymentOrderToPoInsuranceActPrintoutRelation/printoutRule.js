'use strict';
const { paymentOrderStates, paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');

module.exports = function rule(input) {

    const currentActor = this.applicationContext.originatingActorCode;
    const currentState = this.businessContext.documentState;
    const isClaim = input.body.paymentOrderInformation.paymentOrderType === paymentOrderType.Claim &&
        !input.body.paymentOrderInformation.paymentOrderSubType;

    /* Dont forget to add new actors and/or states into configuration.json even if this printout should not be avalable for them.
    States where this printout is not available for all actors can be ignored.
    Or face consequences...
    Printout relations translations are not loading properly if actors are not listed inside configuration.json.*/
    if (isClaim && currentState !== paymentOrderStates.Cancelled && currentActor !== 'PaymentOrderViewer') {

        return {};
    }
};
