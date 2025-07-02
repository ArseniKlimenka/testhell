const poExecutor = require('../../../../lib/paymentOrder/executor');

module.exports = {
    executor,
};

async function executor(step, context, stepContext) {

    await poExecutor.approving(context.paymentOrderMain.paymentOrderNumber);
    console.log('PO approving');

    await poExecutor.approved(context.paymentOrderMain.paymentOrderNumber, 'Approved');
    console.log('PO approved');
}
