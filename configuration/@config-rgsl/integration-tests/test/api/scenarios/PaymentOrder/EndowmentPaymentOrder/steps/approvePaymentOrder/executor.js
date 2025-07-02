const poExecutor = require('../../../../lib/paymentOrder/executor');

async function executor(step, context, stepContext) {
    const po = context.paymentOrder;

    await poExecutor.approving(po.paymentOrderNumber);
    console.log('PO approving');

    await poExecutor.approved(po.paymentOrderNumber);
    console.log('PO approved');

    context.poRgslRequest = await poExecutor.getLastPoRgslRequest(po.referenceNumber);
}

module.exports = {
    executor,
};
