const poExecutor = require('../../../../lib/paymentOrder/executor');

async function executor(step, context, stepContext) {
    const po = context.paymentOrder;

    await poExecutor.cancel(po.paymentOrderNumber);
    console.log('PO cancelled');
}

module.exports = {
    executor,
};
