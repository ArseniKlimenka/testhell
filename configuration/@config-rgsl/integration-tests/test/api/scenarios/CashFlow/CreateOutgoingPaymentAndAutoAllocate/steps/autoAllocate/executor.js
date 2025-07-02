const { autoAllocate } = require('../../../../lib/allocation/executor');

async function executor(step, context, stepContext) {
    context.allocationResult = await autoAllocate(context.bsi.id, stepContext.actor, context.paymentAmount, 0);
}

module.exports = {
    executor,
};
