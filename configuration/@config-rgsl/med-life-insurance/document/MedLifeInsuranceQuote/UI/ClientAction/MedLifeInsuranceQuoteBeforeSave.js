'use strict';

const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { cleanCumulationResults } = require('@config-rgsl/life-insurance/lib/cumulationHelper');

module.exports = async function MedLifeInsuranceQuoteBeforeSave(input, ambientProperties) {
    await evaluatePolicy(input, ambientProperties, this);
    await checkDuplicateGenChkPolicyNumbers(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

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


        await calculateCommissionOnSave(input, ambientProperties);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}

async function checkDuplicateGenChkPolicyNumbers(input, ambientProperties, self) {

    input.context.Body.technicalInformation.duplicateGenChkPolicyNumbers = undefined;
    const productCode = input?.context?.Body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const insuredPerson = input?.context?.Body?.insuredPerson?.partyData?.partyCode;
    const currentStartDate = input?.context?.Body?.policyTerms?.startDate;
    const checkForProductCodes = productGroupArray.GENCHK.includes(productCode);

    if (productCode && insuredPerson && checkForProductCodes) {

        const contractRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GeneralContractSearchDataSource',
            data: {
                data: {
                    criteria: {
                        contractType: 'Policy',
                        insuredPerson: insuredPerson
                    }
                },
                paging: {
                    page: 0,
                    pageSize: 15
                }
            }
        };

        let result;
        try {
            self.view.startBlockingUI();
            result = await ambientProperties.services.api.call(contractRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            self.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {

            const duplicateGenChkPolicy = result.data.filter(item => {
                if (item.resultData.productCode == productCode) {
                    return item;
                }
            });

            const activeDuplicateGenChkPolicy = duplicateGenChkPolicy.filter(item => {
                if (!['Cancelled', 'CancelledByAmendment'].includes(item.resultData.stateCode)) {
                    return item;
                }
            });

            const activeDuplicateGenChkPolicyByDate = activeDuplicateGenChkPolicy.filter(item => {
                const isBefore = dateTimeUtils.isBefore(currentStartDate, item.resultData.endDate);
                if (isBefore) {
                    return item;
                }
            });

            const duplicateGenChkPolicyNumbers = activeDuplicateGenChkPolicyByDate.map(item => item.resultData.number);
            if (duplicateGenChkPolicyNumbers && duplicateGenChkPolicyNumbers.length > 0) {
                input.context.Body.technicalInformation.duplicateGenChkPolicyNumbers = duplicateGenChkPolicyNumbers.toString();
            }
        }
    }
}
