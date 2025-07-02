const testHelperFuncs = require('../../../../lib/common/testHelperFuncs');
const { Client, callDataSource } = require('@adinsure-tools/api-test-framework');
const chai = require('chai');
const { paymentOrderType, paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function executor(step, context, stepContext) {

    const client = new Client();
    const result = await testHelperFuncs.retryValidate(
        async () => callDataSource('PaymentOrderTestDataSource', {
            paging: undefined,
            criteria : { contractNumber: context.contractNumber },
        }, client),
        (response) => {
            expect(response.data.length, 'No payment order found!').to.be.equal(2);
        },
        8
    );

    context.paymentOrderMain = result.data.find(_ => _.resultData.paymentOrderType === paymentOrderType.PolicyCancellation && !_.resultData.paymentOrderSubType).resultData;
    context.paymentOrderPIT = result.data.find(_ => _.resultData.paymentOrderType === paymentOrderType.PolicyCancellation && _.resultData.paymentOrderSubType === paymentOrderSubType.PIT).resultData;
}

module.exports = {
    executor,
};
