const ca = require('@config-rgsl/integration-tests/test/api/scenarios/lib/commissionAct/executor');
const testHelperFuncs = require('@config-rgsl/integration-tests/test/api/scenarios/lib/common/testHelperFuncs');
const chai = require('chai');
const expect = chai.expect;

async function executor(step, context, stepContext) {

    const request = {
        data: {
            actNumber: context.act.number,
            referenceNumbers: [context.referenceNoToInclude],
        }
    };

    await testHelperFuncs.retryValidate(
        () => ca.autoPopulate(request),
        (response) => {
            expect(response.data.itemsAdded, 'Act as not populated!').to.greaterThan(0);
        },
    );
}

module.exports = {
    executor,
};
