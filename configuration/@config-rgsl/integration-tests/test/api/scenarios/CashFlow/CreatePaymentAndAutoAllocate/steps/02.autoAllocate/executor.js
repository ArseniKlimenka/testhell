const { autoAllocate } = require('../../../../lib/allocation/executor');

async function executor(step, context, stepContext) {
    const expectedMatchAmount = context.expectedMatchAmount ?? context.amountToAllocate;
    const expectedPostAmount = context.expectedPostAmount ?? expectedMatchAmount;
    context.allocationResult = await autoAllocate(context.bsi.id, stepContext.actor, expectedMatchAmount, expectedPostAmount);
}

module.exports = {
    executor,
};
