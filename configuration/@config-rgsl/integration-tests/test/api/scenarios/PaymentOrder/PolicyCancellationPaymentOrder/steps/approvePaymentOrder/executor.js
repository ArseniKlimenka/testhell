const poExecutor = require('../../../../lib/paymentOrder/executor');

module.exports = {
    executor,
};

async function executor(step, context, stepContext) {

    context.poMainRgslRequest = await approve(context.paymentOrderMain);
    context.poPitRgslRequest = await approve(context.paymentOrderPIT);
}

async function approve(po) {
    await poExecutor.approving(po.paymentOrderNumber);
    console.log('PO approving');

    await poExecutor.approved(po.paymentOrderNumber);
    console.log('PO approved');

    return await poExecutor.getLastPoRgslRequest(po.referenceNumber);
}
