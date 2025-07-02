'use strict';

const { setValue, getValue, deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { boxedProducts } = require('@config-rgsl/collective-life-insurance/lib/CollectivePolicyConsts');
const { calculateCommissionOnSave } = require('@config-rgsl/agent-agreement-base/lib/AAPolicyCommission');
const productConfigurationCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { setPaymentPeriodString } = require('@config-rgsl/life-insurance/lib/policyTermsHelper');

module.exports = async function CollectiveLifeInsurancePolicyBeforeSave(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    if (!productCode) {

        throw new Error("Нельзя сформировать номер договора, т.к. не выбран продукт!");
    }

    const startDate = getValue(body, 'policyTerms.startDate');

    const productConfiguration = productConfigurationCorp;
    const issueDate = getValue(body, 'basicConditions.issueDate') || dateTimeUtils.newDateAsString();
    const productConf = productConfiguration({ productCode, issueDate }) || {};
    const prefix = productConf.prefix;
    const currencyCode = getValue(body, 'basicConditions.currency.currencyCode');
    const currentPrefix = prefix ? prefix[currencyCode] : '';
    const currentPrefixLengthLessThan5 = currentPrefix?.length < 5;
    const currentPrefixIs31200 = currentPrefix == '31200';

    if (!startDate && (currentPrefixLengthLessThan5 || currentPrefixIs31200)) {

        throw new Error("Нельзя сформировать номер договора, т.к. не указана дата начала действия!");
    }

    await evaluatePolicy(input, ambientProperties, this);
};

async function evaluatePolicy(input, ambientProperties, self) {

    try {
        self.view.startBlockingUI();

        await self.view.evaluate([
            '/policyHolder/**',
            '/policyTerms',
            '/risks',
            '/insuranceRules',
            '/issueForm'
        ], false, true);

        // should be after risks because depends on risks
        await self.view.evaluate([
            '/uwTriggers'
        ], false, true);

        // should be after policyTerms and risks because depends on policyTerms and risks
        setPaymentPeriodString(input, ambientProperties);
        await self.view.evaluate([
            '/additionalServices',
            '/giftServices'
        ], false, true);

        if (await isTariffFactorsChanged(input)) {
            await deletePremium(input, ambientProperties);
            await deleteInsuredList(input, ambientProperties);
        }

        await calculateCommissionOnSave(input, ambientProperties);

    } catch (error) {
        self.view.stopBlockingUI();
        throw error;
    }
}

async function deleteInsuredList(input, ambientProperties) {

    const collectivePolicyInsuredCount = getValue(input, 'context.Body.technicalInformation.collectivePolicyInsuredCount', 0);
    const currentProductCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode', 'productCode');
    const previousProductCode = getValue(input, 'context.Body.technicalInformation.collectivePolicyInsuredLoadedProductCode', 'productCode');
    if (collectivePolicyInsuredCount == 0 || currentProductCode == previousProductCode ) {

        return;
    }

    setValue(input, 'context.Body.technicalInformation.collectivePolicyInsuredCount', 0);

    const request = {
        method: "post",
        url: "api/core/shared/integration-services/ClearCollectivePolicyInsuredListIS/1",
        data: {
            data: {
                contractNumber: input.context.Number
            }
        }
    };

    await ambientProperties.services.api.call(request);
}

async function deletePremium(input, ambientProperties) {

    const collectivePolicyPremiumWasCalculated = getValue(input, 'context.Body.technicalInformation.collectivePolicyPremiumWasCalculated', false);
    if (!collectivePolicyPremiumWasCalculated) {

        return;
    }

    setValue(input, 'context.Body.technicalInformation.collectivePolicyPremiumWasCalculated', false);

    const withTarification = getValue(input, 'context.Body.basicConditions.withTarification', false);
    if (withTarification) {

        const productCode = getValue(input, 'context.Body.mainInsuranceConditions.insuranceProduct.productCode', 'productCode');

        const request = {
            method: "post",
            url: "api/core/shared/integration-services/ClearCollectivePolicyPremiumIS/1",
            data: {
                data: {
                    contractNumber: input.context.Number,
                    isNeedClearSummaryRiskData: boxedProducts.includes(productCode)
                }
            }
        };

        await ambientProperties.services.api.call(request);
    }
}

async function isTariffFactorsChanged(input) {

    const old = deepCopy(getValue(input, 'context.Body.technicalInformation.collectivePolicyTariffFactors'));
    const current = {
        paymentFrequencyCode: deepCopy(getValue(input, 'context.Body.basicConditions.paymentFrequency.paymentFrequencyCode')),
        insuranceTerms: deepCopy(getValue(input, 'context.Body.basicConditions.insuranceTerms')),
        startDate: deepCopy(getValue(input, 'context.Body.policyTerms.startDate')),
        endDate: deepCopy(getValue(input, 'context.Body.policyTerms.endDate'))
    };

    if (!old || !current) { return true; }

    Object.keys(old).forEach(key => old[key] === undefined ? delete old[key] : {});
    Object.keys(current).forEach(key => current[key] === undefined ? delete current[key] : {});

    const isChanged = !_.isEqual(old, current);

    return isChanged;
}
