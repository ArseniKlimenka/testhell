'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertBsi(step, context, stepContext) {

    expect(context.bsi).to.shallowDeepEqual(stepContext.expected.bsi);
}

module.exports = {
    assertBsi,
};
