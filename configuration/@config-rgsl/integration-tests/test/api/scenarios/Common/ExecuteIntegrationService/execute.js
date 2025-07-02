const { executeIntegrationService } = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');

async function execute(step, context, stepContext) {

    const actor = stepContext.actor;
    const integrationServiceName = context.integrationServiceName;
    const request = context.integrationServiceRequest;

    const result = await executeIntegrationService(integrationServiceName, request, actor);
    if (context.resultField) {
        context[context.resultField] = result.data;
    }
}

module.exports = {
    execute,
};
