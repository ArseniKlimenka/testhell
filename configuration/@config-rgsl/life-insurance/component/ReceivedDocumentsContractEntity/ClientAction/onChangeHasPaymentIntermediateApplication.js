'use strict';

module.exports = function onChangeHasPaymentIntermediateApplication(input, ambientProperties) {

    delete input.componentContext.paymentIntermediateApplicationDate;

    this.view.rebind();
};
