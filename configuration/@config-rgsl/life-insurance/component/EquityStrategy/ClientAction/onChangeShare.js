'use strict';

const { getFinalSumShare } = require('@config-rgsl/life-insurance/lib/equityStrategiesHelper');

module.exports = async function onChangeShare(input, ambientProperties) {

    const finalSumShare = getFinalSumShare(input, ambientProperties, this);
    const finalSum = finalSumShare?.finalSum;
    const finalShare = finalSumShare?.finalShare;

    input.context.sum = undefined;
    input.context.share = undefined;

    await this.view.rebind();

    input.context.sum = finalSum;
    input.context.share = finalShare;

    await this.view.rebind();

};
