const alc = require('@config-rgsl/integration-tests/test/api/scenarios/lib/allocation/executor');

async function allocate(step, context, stepContext) {
    context.allocationResult = await alc.allocate(context.bsi.id, context.payAmount, context.docAmount, context.referenceNo, stepContext.actor);
}

module.exports = {
    allocate,
};
