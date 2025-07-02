'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const { cleanCumulationResults } = require('@config-rgsl/life-insurance/lib/cumulationHelper');

module.exports = async function CreditLifeInsuranceQuoteBeforeSave(input, ambientProperties) {
    await evaluatePolicy(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

    input.context.ClientViewModel.checkResults = [];

    if (!input.context.Body.insuranceRules) {
        input.context.Body.insuranceRules = {};
    }

    try {
        self.view.startBlockingUI();

        await self.view.evaluate([
            '/risks'
        ], false, true);

        await self.view.evaluate([
            '/policyHolder/**',
            '/insuredPerson/**',
            '/beneficiaries',
            '/policyTerms',
            '/declarationMedical',
            '/declarationMain',
            '/insuranceRules',
            '/issueForm',
            '/creditContract',
            '/creditProgram',
            '/basicConditions',
            '/commission[EnrichAADocument]'
        ], false, true);

        // should be after because depends on previous
        await self.view.evaluate([
            '/risks'
        ], false, true);

        // Cumulation should be after risks because depends on risks
        // Cumulation should be before uwTriggers because should be added to uwTriggers
        await cleanCumulationResults(input.context.Body);
        await self.view.evaluate([
            '/cumulation'
        ], false, true);

        // should be after risks because depends on risks
        await self.view.evaluate([
            '/uwTriggers'
        ], false, true);

        await calculateCommissionOnSave(input, ambientProperties);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}
