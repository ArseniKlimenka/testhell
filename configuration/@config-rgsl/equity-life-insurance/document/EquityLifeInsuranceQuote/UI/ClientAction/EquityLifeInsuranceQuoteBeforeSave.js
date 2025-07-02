'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const { cleanCumulationResults } = require('@config-rgsl/life-insurance/lib/cumulationHelper');

module.exports = async function EquityLifeInsuranceQuoteBeforeSave(input, ambientProperties) {
    await evaluatePolicy(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

    input.context.ClientViewModel.checkResults = [];

    try {
        self.view.startBlockingUI();

        // Since risks data is dependant from all data
        // risks enrichment MUST be called as LAST in the list
        await self.view.evaluate([
            '/policyHolder/**',
            '/insuredPerson/**',
            '/beneficiaries',
            '/policyTerms',
            '/risks',
            '/declarationMedical',
            '/declarationMain',
            '/insuranceRules',
            '/issueForm',
            '/commission[EnrichAADocument]',
            '/equityStrategies',
            '/additionalInvestmentParameters'
        ], false, true);

        // should be after policy holder depends on it
        await self.view.evaluate([
            '/attachmentsPackage'
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

        // should be after policyTerms and risks because depends on policyTerms and risks
        await self.view.evaluate([
            '/additionalServices',
            '/giftServices'
        ], false, true);

        await calculateCommissionOnSave(input, ambientProperties);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}
