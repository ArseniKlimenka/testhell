'use strict';

const chai = require('chai');

async function assertAllocation(step, context, stepContext) {

    const allocatedAmount = context.allocationResult.reduce((a, b) => { return a + b.allocatedAmount; }, 0);
    chai.assert.equal(allocatedAmount, context.amountToAllocate, "Wrong amount allocated!");
    console.log("Allocated amount: " + allocatedAmount);
}

module.exports = {
    assertAllocation,
};
