const { executeEtlService } = require('../../lib/common/testHelperFuncs');

async function executeEtl(step, context, stepContext) {

    const etlName = context.etlName;
    const request = context.etlRequest;

    await executeEtlService(etlName, request);
}

module.exports = {
    executeEtl,
};
