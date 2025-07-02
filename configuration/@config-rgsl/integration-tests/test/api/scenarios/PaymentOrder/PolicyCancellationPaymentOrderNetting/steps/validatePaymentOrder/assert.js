'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPO(step, context, stepContext) {
    expect(context.paymentOrderMain).to.shallowDeepEqual(stepContext.expected.paymentOrderMain);
    expect(context.paymentOrderPIT).to.shallowDeepEqual(stepContext.expected.paymentOrderPIT);
}

module.exports = {
    assertPO,
};
