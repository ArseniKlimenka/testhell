const poExecutor = require('../../../../lib/paymentOrder/executor');

async function executor(step, context, stepContext) {

    context.paymentOrder = await poExecutor.createBsiPaymentOrder(context.bsiIn.id, stepContext.actor);

    console.log("PaymentOrder number: " + context.paymentOrder.paymentOrderNumber);
}

module.exports = {
    executor,
};
