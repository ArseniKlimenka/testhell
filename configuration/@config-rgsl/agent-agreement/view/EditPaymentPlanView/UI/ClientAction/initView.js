'use strict';

module.exports = function initView(input, ambientProperties) {

    input.context.Body.paymentPlan = this.view.getCustomData().paymentPlan;
};
