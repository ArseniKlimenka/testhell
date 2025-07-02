'use strict';

module.exports = function initView(input, ambientProperties) {

    const viewCtx = this.view;
    const customData = viewCtx.getCustomData();
    const body = input.context.Body;

    body.additionalServices = customData;
};
