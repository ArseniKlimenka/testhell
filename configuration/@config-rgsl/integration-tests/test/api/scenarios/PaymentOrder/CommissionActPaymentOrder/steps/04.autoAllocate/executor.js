const { autoAllocate } = require('../../../../lib/allocation/executor');

async function executor(step, context, stepContext) {
    context.bsiOutAllocationResult = await autoAllocate(context.bsiOut.id, stepContext.actor, 5000, 0);
}

module.exports = {
    executor,
};
