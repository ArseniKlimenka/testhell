'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');

module.exports = async function CreditLifeInsurancePolicyBeforeSave(input, ambientProperties) {
    await evaluatePolicy(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

    input.context.ClientViewModel.checkResults = [];

    try {
        self.view.startBlockingUI();

        await self.view.evaluate([
            '/policyHolder/**',
            '/insuredPerson/**',
            '/insuranceRules',
            '/issueForm',
            '/risks',
            '/commission[EnrichAADocument]'
        ], false, true);

        await calculateCommissionOnSave(input, ambientProperties);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }

}
