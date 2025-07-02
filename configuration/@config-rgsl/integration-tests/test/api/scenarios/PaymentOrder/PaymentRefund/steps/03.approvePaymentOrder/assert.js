'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPO(step, context, stepContext) {
    expect(context.poRgslRequest).to.shallowDeepEqual(stepContext.expected.poRgslRequest);
}

module.exports = {
    assertPO,
};
