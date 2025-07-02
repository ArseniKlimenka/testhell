'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const { cleanCumulationResults } = require('@config-rgsl/life-insurance/lib/cumulationHelper');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function InvestmentLifeInsuranceQuoteBeforeSave(input, ambientProperties) {
    await evaluatePolicy(input, ambientProperties, this);
    await saveAssetEntity(input, ambientProperties, this);
};

async function saveAssetEntity(input, ambientProperties, self) {
    const assetProperties = input?.context?.Body?.basicAssetProperties?.assetProperties;

    if (assetProperties && assetProperties[0]?.asset && !assetProperties[0]?.asset?.assetEntityNumber) {

        const assetNumber = input.context?.Body?.basicAssetProperties?.assetProperties[0]?.asset?.assetNumber;
        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/AssetEntityDataSource',
            data: {
                data: {
                    criteria: {
                        assetNumber: assetNumber
                    }
                }
            }
        };

        let result;
        try {
            self.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
            if (result?.data?.length > 0) {
                input.context.Body.basicAssetProperties.assetProperties[0].asset.assetEntityNumber = result.data[0]?.resultData?.assetEntityNumber;
            }
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            self.view.stopBlockingUI();
        }
    }
}

async function evaluatePolicy(input, ambientProperties, self) {

    const body = input.context.Body;
    input.context.ClientViewModel.checkResults = [];

    if (!input.context.Body.insuranceRules) {
        input.context.Body.insuranceRules = {};
    }

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
            '/commission[EnrichAADocument]'
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

        // should be after policyTerms because depends on policy start/end dates
        await self.view.evaluate([
            '/basicInvestmentParameters'
        ], false, true);

        await calculateCommissionOnSave(input, ambientProperties);

        if (body.basicInvestmentParameters?.rateOfReturn) {
            await self.view.evaluate(['/attachmentsPackage'], false, true);
        }

        await self.view.evaluate(['/basicAssetProperties'], false, true);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}
