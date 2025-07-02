'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertData(step, context, stepContext) {

    expect(context.smallPayments).to.shallowDeepEqual(stepContext.expected);
}

module.exports = {
    assertData,
};
