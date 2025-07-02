'use strict';

const ca = require('@config-rgsl/integration-tests/test/api/scenarios/lib/commissionAct/executor');
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function asserter(step, context, stepContext) {

    const act = await ca.getAct(context.act.number);
    expect(act).to.shallowDeepEqual(stepContext.expected.act);
}

module.exports = {
    asserter,
};
