'use strict';

const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
const expect = chai.expect;

async function assertPO(step, context, stepContext) {
    expect(context.poMainRgslRequest).to.shallowDeepEqual(stepContext.expected.poMainRgslRequest);
    expect(context.poPitRgslRequest).to.shallowDeepEqual(stepContext.expected.poPitRgslRequest);
}

module.exports = {
    assertPO,
};
