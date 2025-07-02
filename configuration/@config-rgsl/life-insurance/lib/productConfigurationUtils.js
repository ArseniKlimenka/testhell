'use strict';

const { setValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const { getRateOfReturnRulesEquityActives } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesEquityActivesHelper');

const { riskPackagesConfiguration } = require('@config-rgsl/life-insurance/lib/riskPackagesConfiguration');
const { paymentFrequency, endowmentPaymentVariant, issueForm, strategyDesc, currency, productGroupArray, guaranteedIncome, giftServices, quoteState, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { copyInsuranceRulesToClientViewModel } = require('@config-rgsl/life-insurance/lib/collectivePolicyHelper');
const { getRateOfReturnRules } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const constants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { mapAvailableInsuranceTermsDays } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelper');

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

async function handleOnChangeInsuranceProduct(input, ambientProperties, that) {

    let body = input.context.Body;
    const clientViewModel = input.context.ClientViewModel;
    const isNewCollectivePolicy = ambientProperties.configurationCodeName == constants.productCode.CollectiveLifeInsurancePolicy && !input.context.Number;
    const isOnChangeInsuranceProduct = true;
    const isOnChangeIssueDate = false;
    const isOnChangePaymentFrequency = false;
    const currentProduct = body.mainInsuranceConditions.insuranceProduct;
    const shouldResetBody = isNewCollectivePolicy && clientViewModel.lastAssignedProduct && clientViewModel.initialBody;
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (shouldResetBody) {

        const currentPartner = body.mainInsuranceConditions.partner;
        input.context.Body = deepCopy(clientViewModel.initialBody);
        input.context.Body.mainInsuranceConditions.insuranceProduct = currentProduct;
        input.context.Body.mainInsuranceConditions.partner = currentPartner;
        body = input.context.Body;
    }

    const checkResults = await processProductSelection(body, that, ambientProperties, isOnChangeInsuranceProduct, isOnChangeIssueDate, isOnChangePaymentFrequency);

    if (checkResults && checkResults.length > 0) {

        clientViewModel.checkResults = checkResults;

        if (!shouldResetBody) {

            const notificationMessage = "При изменении продукта значение некоторых полей было скорректировано: "
                + checkResults.map(item => item.messageText).join('; ');
            ambientProperties.services.confirmationDialog.showConfirmation(notificationMessage, 'ОК', 'ОК', 2);
        }
    }

    if (shouldResetBody) {

        ambientProperties.services.confirmationDialog.showConfirmation('При изменении продукта значение всех полей было сброшено к исходному состоянию', 'ОК', 'ОК', 2);
    }

    if (isNewCollectivePolicy) {

        clientViewModel.lastAssignedProduct = currentProduct;
    }

    const productConfiguration = body?.productConfiguration;

    // fill "availableInsuranceTermsDays" input field
    if (productConfiguration?.insuranceTermsDays?.length > 0) {

        input.context.Body.basicConditions.availableInsuranceTermsDays = mapAvailableInsuranceTermsDays(productConfiguration.insuranceTermsDays);
    }

    if (!productGroupArray.PRODUCTS_WITH_SPECIAL_OFFER.includes(productCode)) {

        input.context.Body.basicConditions.isSpecialOffer = undefined;
    }

    that.view.validate();
    that.view.reevaluateRules();
    that.view.rebind();
}

/**
     * @description Check and correct quote data on product re-selection
     * @param {object} body body
     * @param {object} self this
     * @returns {array} corrections result
     */
async function processProductSelection(body, self, ambientProperties, isOnChangeInsuranceProduct, isOnChangeIssueDate, isOnChangePaymentFrequency, isOnChangeEndowmentPaymentVariant) {

    const result = [];

    const issueDate = body?.basicConditions?.issueDate || DateTimeUtils.newDateAsString();
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if (!productCode) {
        return result;
    }

    const selfViewContext = self.view.getContext();
    const selfViewContextState = selfViewContext.State;
    const isCollectivePolicy = selfViewContext.ConfigurationCodeName == 'CollectiveLifeInsurancePolicy';
    const isAccumulatedLifeInsuranceQuote = selfViewContext.ConfigurationCodeName == 'AccumulatedLifeInsuranceQuote';
    const isOnReview = selfViewContextState.Code == quoteState.OnReview;
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : await getProductConfiguration(ambientProperties, productCode, issueDate);

    if (!isCollectivePolicy) {
        setValue(body, 'productConfiguration', productConf);
    }

    const clientViewModel = selfViewContext.ClientViewModel;

    if (isCollectivePolicy) {

        setValue(body, 'basicConditions.withTarification', productConf.withTarification);

        if (productGroupArray.COLLECTIVE_NSIBPOOLS.includes(productCode)) {
            setValue(body, 'basicConditions.calcFromInsuredSum', true);
        }
    }

    // check product
    if (!productConf) {
        setValue(body, 'mainInsuranceConditions.insuranceProduct', {});
        result.push({
            messageText: 'сброшен страховой продукт',
            dataProperty: 'insuranceProduct'
        });
        return result;
    }

    if (body.basicConditions) {
        if (body.basicConditions.isReinvest && !productConf.isReinvestAvailable) {
            body.basicConditions.isReinvest = false;
            body.basicConditions.invoiceOnActivation = false;
            result.push({
                messageText: 'сброшен флаг "Реинвестирование"',
                dataProperty: 'basicConditions.isReinvest'
            });
        }

        body.basicConditions.invoiceOnActivation = body.basicConditions.isReinvest && productConf.invoiceOnActivationIfReinvest;
    }

    // check issue form
    if (!isCollectivePolicy) {
        const availableIssueForms = productConf.paperTypes;
        const currentIssueForm = body?.issueForm?.code?.issueFormCode;
        if (!currentIssueForm && availableIssueForms.length == 1) {
            // set default value, no notify
            setValue(body, 'issueForm', {});
            setValue(body, 'issueForm.code', issueForm[availableIssueForms[0]]);
        }
        if (currentIssueForm && !availableIssueForms.includes(currentIssueForm)) {
            if (availableIssueForms.length == 1) {
                // set default value and notify
                setValue(body, 'issueForm', {});
                setValue(body, 'issueForm.code', issueForm[availableIssueForms[0]]);
                result.push({
                    messageText: 'изменена форма выпуска',
                    dataProperty: 'issueForm'
                });
            }
            else {
                // clear value and notify
                setValue(body, 'issueForm', {});
                result.push({
                    messageText: 'сброшена форма выпуска, необходимо перевыбрать',
                    dataProperty: 'issueForm'
                });
            }
        }
    }

    // check payment frequency
    const availablePaymentFrequency = productConf.paymentFrequency;
    const currentPaymentFrequency = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const paymentFrequencyCode = availablePaymentFrequency[0];
    const paymentFrequencyDescription = paymentFrequencyCode
        && paymentFrequency[Object.keys((paymentFrequency)).filter(k => paymentFrequency[k].code == paymentFrequencyCode)].description;

    if (!currentPaymentFrequency && availablePaymentFrequency.length == 1) {
        // set default value, no notify
        const valueToSet = {
            paymentFrequencyCode,
            paymentFrequencyDescription
        };
        setValue(body, 'basicConditions.paymentFrequency', valueToSet);
    }
    if (currentPaymentFrequency && !availablePaymentFrequency.includes(currentPaymentFrequency)) {
        if (availablePaymentFrequency.length == 1) {
            // set default value and notify
            const valueToSet = {
                paymentFrequencyCode,
                paymentFrequencyDescription
            };
            setValue(body, 'basicConditions.paymentFrequency', valueToSet);
            result.push({
                messageText: 'изменена рассрочка',
                dataProperty: 'paymentFrequency'
            });
        }
        else {
            // clear value and notify
            setValue(body, 'basicConditions.paymentFrequency', {});
            result.push({
                messageText: 'сброшена рассрочка, необходимо перевыбрать',
                dataProperty: 'paymentFrequency'
            });
        }
    }

    // endowment payment variant
    const availableEndowmentPaymentVariants = productConf.availablePaymentFrequency;
    const currentEndowmentPaymentVariant = body?.basicConditions?.endowmentPaymentVariant?.endowmentPaymentVariantCode;
    const endowmentPaymentVariantCode = availableEndowmentPaymentVariants[0];
    const endowmentPaymentVariantDescription = endowmentPaymentVariantCode
        && endowmentPaymentVariant[Object.keys((endowmentPaymentVariant)).filter(k => endowmentPaymentVariant[k].endowmentPaymentVariantCode == endowmentPaymentVariantCode)].endowmentPaymentVariantDescription;

    if (!currentEndowmentPaymentVariant && availableEndowmentPaymentVariants.length == 1) {
        // set default value, no notify
        const valueToSet = {
            endowmentPaymentVariantCode,
            endowmentPaymentVariantDescription
        };
        setValue(body, 'basicConditions.endowmentPaymentVariant', valueToSet);
    }
    if (currentEndowmentPaymentVariant && !availableEndowmentPaymentVariants.includes(currentEndowmentPaymentVariant)) {
        if (availableEndowmentPaymentVariants.length == 1) {
            // set default value and notify
            const valueToSet = {
                endowmentPaymentVariantCode,
                endowmentPaymentVariantDescription
            };
            setValue(body, 'basicConditions.endowmentPaymentVariant', valueToSet);
            result.push({
                messageText: 'изменен вариант выплаты по дожитию',
                dataProperty: 'endowmentPaymentVariant'
            });
        }
        else {
            // clear value and notify
            setValue(body, 'basicConditions.endowmentPaymentVariant', {});
            result.push({
                messageText: 'сброшен вариант выплаты по дожитию, необходимо перевыбрать',
                dataProperty: 'endowmentPaymentVariant'
            });
        }
    }

    // check currency
    const availableCurrencies = productConf.availableCurrencies;
    const currentCurrency = body?.basicConditions?.currency?.currencyCode;
    const currencyCode = availableCurrencies[0];
    const currencyDesc = currencyCode
        && currency[Object.keys((currency)).filter(k => currency[k].code == currencyCode)].description;
    const currencyNumericCode = currencyCode
        && currency[Object.keys((currency)).filter(k => currency[k].code == currencyCode)].numericCode;

    if (!currentCurrency && availableCurrencies.length == 1) {
        // set default value, no notify
        const valueToSet = {
            currencyCode,
            currencyDesc,
            currencyNumericCode
        };
        setValue(body, 'basicConditions.currency', valueToSet);
    }
    if (currentCurrency && !availableCurrencies.includes(currentCurrency)) {
        if (availableCurrencies.length == 1) {
            // set default value and notify
            const valueToSet = {
                currencyCode,
                currencyDesc,
                currencyNumericCode
            };
            setValue(body, 'basicConditions.currency', valueToSet);
            result.push({
                messageText: 'изменена валюта',
                dataProperty: 'currency'
            });
        }
        else {
            // clear value and notify
            setValue(body, 'basicConditions.currency', {});
            result.push({
                messageText: 'сброшена валюта, необходимо перевыбрать',
                dataProperty: 'currency'
            });
        }
    }

    // check insurance terms
    const availableInsuranceTerms = productConf.insuranceTerms || [];
    const currentInsuranceTerms = body?.basicConditions?.insuranceTerms;
    if (availableInsuranceTerms.length > 0) {
        if (!currentInsuranceTerms && availableInsuranceTerms.length == 1) {
            // set default value, no notify
            setValue(body, 'basicConditions.insuranceTerms', availableInsuranceTerms[0]);
        }
        if (currentInsuranceTerms && !availableInsuranceTerms.includes(currentInsuranceTerms)) {
            if (availableInsuranceTerms.length == 1) {
                // set default value and notify
                setValue(body, 'basicConditions.insuranceTerms', availableInsuranceTerms[0]);
                result.push({
                    messageText: 'изменен срок страхования',
                    dataProperty: 'insuranceTerms'
                });
            }
            else {
                // clear value and notify
                setValue(body, 'basicConditions.insuranceTerms', undefined);
                result.push({
                    messageText: 'сброшен срок страхования, необходимо перевыбрать',
                    dataProperty: 'insuranceTerms'
                });
            }
        }
    }

    const availableInsuranceTermsMonths = productConf.insuranceTermsMonths || [];
    const currentInsuranceTermsMonths = body?.basicConditions?.insuranceTermsMonths;
    if (availableInsuranceTermsMonths.length > 0) {
        if (!currentInsuranceTermsMonths && availableInsuranceTermsMonths.length == 1) {
            // set default value, no notify
            setValue(body, 'basicConditions.insuranceTermsMonths', availableInsuranceTermsMonths[0]);
        }
        if (currentInsuranceTermsMonths && !availableInsuranceTermsMonths.includes(currentInsuranceTermsMonths)) {
            if (availableInsuranceTermsMonths.length == 1) {
                // set default value and notify
                setValue(body, 'basicConditions.insuranceTermsMonths', availableInsuranceTermsMonths[0]);
                result.push({
                    messageText: 'изменен срок страхования',
                    dataProperty: 'insuranceTermsMonths'
                });
            }
            else {
                // clear value and notify
                setValue(body, 'basicConditions.insuranceTermsMonths', undefined);
                result.push({
                    messageText: 'сброшен срок страхования, необходимо перевыбрать',
                    dataProperty: 'insuranceTermsMonths'
                });
            }
        }
    }

    const availableInsuranceTermsDays = productConf.insuranceTermsDays || [];
    const currentInsuranceTermsDays = body?.basicConditions?.insuranceTermsDays?.value;
    if (availableInsuranceTermsDays.length > 0) {
        if (!currentInsuranceTermsDays && availableInsuranceTermsDays.length == 1) {
            // set default value, no notify
            body.basicConditions.insuranceTermsDays = availableInsuranceTermsDays[0];
        }
        if (currentInsuranceTermsDays && !availableInsuranceTermsDays.includes(currentInsuranceTermsDays)) {
            if (availableInsuranceTermsDays.length == 1) {
                // set default value and notify
                body.basicConditions.insuranceTermsDays = availableInsuranceTermsDays[0];
                result.push({
                    messageText: 'изменен срок страхования',
                    dataProperty: 'insuranceTermsDays'
                });
            }
            else {
                // clear value and notify
                body.basicConditions.insuranceTermsDays = undefined;
                result.push({
                    messageText: 'сброшен срок страхования, необходимо перевыбрать',
                    dataProperty: 'insuranceTermsDays'
                });
            }
        }
    }

    // check policy holder type
    const policyHolderTypeConf = productConf.policyHolderType;
    const currentPolicyHolderPartyType = body?.policyHolder?.partyData?.partyType;
    if (currentPolicyHolderPartyType && policyHolderTypeConf != currentPolicyHolderPartyType) {
        setValue(body, 'policyHolder', {});
        setValue(body, 'policyHolder.participantType', 'policyHolder');
        result.push({
            messageText: 'сброшен страхователь',
            dataProperty: 'policyHolder'
        });
    }

    // check insured person
    const insuredIsPolicyHolder = productConf.insuredIsPolicyHolder;
    const currentIsPolicyHolder = body?.insuredPerson?.isPolicyHolder;
    const currentPolicyHolderPartyCode = body?.policyHolder?.partyData?.partyCode;
    const currentInsuredPersonPartyCode = body?.insuredPerson?.partyData?.partyCode;
    if (insuredIsPolicyHolder && !currentIsPolicyHolder) {
        if (!currentPolicyHolderPartyCode && !currentInsuredPersonPartyCode) {
            // set default value, no notify
            setValue(body, 'insuredPerson.isPolicyHolder', true);
        }
        else {
            // set default value and notify
            setValue(body, 'insuredPerson.isPolicyHolder', true);
            if (currentPolicyHolderPartyCode) {
                setValue(body, 'insuredPerson.partyData', body?.policyHolder?.partyData ?? {});
            }
            else {
                setValue(body, 'policyHolder.partyData', body?.insuredPerson?.partyData ?? {});
            }
            result.push({
                messageText: 'застрахованный установлен равным страхователю',
                dataProperty: 'isPolicyHolder'
            });
        }
    }


    // check strategy
    const availableStrategy = productConf.strategy || [];
    const currentStrategy = body?.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
    if (!currentStrategy && availableStrategy.length == 1) {
        // set default value, no notify
        body.basicInvestmentParameters = {};
        body.basicInvestmentParameters.investmentStrategy = {};
        setValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode', availableStrategy[0]);
        setValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyDescription', strategyDesc[availableStrategy[0]]);
    }
    if (currentStrategy && !availableStrategy.includes(currentStrategy)) {
        if (availableStrategy.length == 1) {
            // set default value and notify
            body.basicInvestmentParameters = {};
            body.basicInvestmentParameters.investmentStrategy = {};
            setValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode', availableStrategy[0]);
            setValue(body, 'basicInvestmentParameters.investmentStrategy.investmentStrategyDescription', strategyDesc[availableStrategy[0]]);
            result.push({
                messageText: 'изменена стратегия',
                dataProperty: 'basicInvestmentParameters'
            });
        }
        else {
            // clear value and notify
            body.basicInvestmentParameters = {};
            body.basicInvestmentParameters.investmentStrategy = {};
            result.push({
                messageText: 'сброшена стратегия, необходимо перевыбрать',
                dataProperty: 'basicInvestmentParameters'
            });
        }
    }
    clientViewModel.recommendedStrategies = getRecommendedStrategies(body, self, ambientProperties);

    // check strategy equity
    if (self.getElementId() == 'insuranceProductId') {
        const equityStrategies = body?.equityStrategies ?? [];
        if (equityStrategies.length > 0) {
            // clear value and notify
            body.equityStrategies = [];
            result.push({
                messageText: 'сброшены базовые параметры инвестирования, необходимо перевыбрать',
                dataProperty: 'equityStrategies'
            });
        }
    }

    // check premium
    const isWholeLife = productConf.isWholeLife;
    const currentRiskPremium = body?.basicConditions?.riskPremium;
    const fixedPremiumsConf = productConf.fixedPremiums || {};
    const fixedPremiums = [];
    Object.keys(fixedPremiumsConf)
        .forEach(item => Object.keys(fixedPremiumsConf[item])
            .forEach(item2 => fixedPremiumsConf[item][item2]
                .forEach(elem => { if (!fixedPremiums.some(fpItem => fpItem.value == elem)) { fixedPremiums.push({ value: elem }); } })));
    fixedPremiums.sort((a, b) => a.value - b.value);
    setValue(body, 'basicConditions.fixedPremiums', fixedPremiums);

    const availableFixedPremiums =
        currentPaymentFrequency &&
        (currentInsuranceTerms || isWholeLife) &&
        fixedPremiumsConf &&
        fixedPremiumsConf[currentPaymentFrequency] &&
        (fixedPremiumsConf[currentPaymentFrequency][currentInsuranceTerms] || fixedPremiumsConf[currentPaymentFrequency]['any']) || [];
    if (availableFixedPremiums.length > 0 && currentRiskPremium && !availableFixedPremiums.includes(currentRiskPremium)) {
        setValue(body, 'basicConditions.riskPremium', undefined);
        result.push({
            messageText: 'сброшен размер взноса',
            dataProperty: 'riskPremium'
        });
    }

    // check insured sum
    const currentRiskInsuredSum = body?.basicConditions?.riskInsuredSum;
    const fixedInsuredSumsConf = productConf.fixedInsuredSums || {};
    const fixedInsuredSums = [];
    Object.keys(fixedInsuredSumsConf)
        .forEach(item => Object.keys(fixedInsuredSumsConf[item])
            .forEach(item2 => fixedInsuredSumsConf[item][item2]
                .forEach(elem => { if (!fixedInsuredSums.some(fpItem => fpItem.value == elem)) { fixedInsuredSums.push({ value: elem }); } })));
    fixedInsuredSums.sort((a, b) => a.value - b.value);
    setValue(body, 'basicConditions.fixedInsuredSums', fixedInsuredSums);

    const availableFixedInsuredSums =
        currentPaymentFrequency &&
        (currentInsuranceTerms || isWholeLife) &&
        fixedInsuredSumsConf &&
        fixedInsuredSumsConf[currentPaymentFrequency] &&
        (fixedInsuredSumsConf[currentPaymentFrequency][currentInsuranceTerms] || fixedInsuredSumsConf[currentPaymentFrequency]['any']) || [];
    if (availableFixedInsuredSums.length > 0 && currentRiskInsuredSum && !availableFixedInsuredSums.includes(currentRiskInsuredSum)) {
        setValue(body, 'basicConditions.riskInsuredSum', undefined);
        result.push({
            messageText: 'сброшен размер страховой суммы',
            dataProperty: 'riskInsuredSum'
        });
    }

    // set first fixed insured sum for products
    if (productConf.setFirstFixedInsuredSum && fixedInsuredSums && fixedInsuredSums[0] && fixedInsuredSums[0].value) {
        setValue(body, 'basicConditions.riskInsuredSum', fixedInsuredSums[0].value.toString());
    }

    // check risk packages
    if (!body.risksPackages) { body.risksPackages = {}; }
    body.risksPackages.availablePackages = [];
    const currentSelectedPackages = body?.risksPackages?.selectedPackages ?? [];
    if (productConf.riskPackages) {
        productConf.riskPackages.forEach(packageCode => {
            const packageConf = riskPackagesConfiguration({ packageCode });
            body.risksPackages.availablePackages.push({ packageCode, packageName: packageConf.packageName });
        });
        const availablePackages = body?.risksPackages?.availablePackages ?? [];
        if (currentSelectedPackages.some(item => !availablePackages.some(element => element.packageCode == item.packageCode))) {
            body.risksPackages.selectedPackages = [];
            result.push({
                messageText: 'сброшены дополнительные риски',
                dataProperty: 'selectedPackages'
            });
        }
    }
    else {
        body.risksPackages.availablePackages = [];
        body.risksPackages.selectedPackages = [];
    }

    // reset medical confirmation
    const resetMedicalConfirmationForProductCodes = productGroupArray.GENCHK.includes(productCode);

    if (resetMedicalConfirmationForProductCodes) {
        body.declarationMedicalConfirmation = {};
    }

    // reset beneficiaries
    const resetBeneficiariesForProductCodes = !isCollectivePolicy && [
        ...productGroupArray.RHE,
        ...productGroupArray.GENCHK,
        ...productGroupArray.MEDPRO
    ].includes(productCode);

    if (resetBeneficiariesForProductCodes) {
        body.beneficiaries = {};
    }

    // set guaranteedIncome
    const availableGuaranteedIncome = productConf.guaranteedIncome;
    if (availableGuaranteedIncome && availableGuaranteedIncome.length > 0) {
        const guaranteedIncomeCode = availableGuaranteedIncome[0];
        const guaranteedIncomeDescription = guaranteedIncomeCode
            && guaranteedIncome[Object.keys((guaranteedIncome)).filter(k => guaranteedIncome[k].code == guaranteedIncomeCode)].description;
        setValue(body, 'basicConditions.guaranteedIncome', {});
        setValue(body, 'basicConditions.guaranteedIncome.guaranteedIncomeCode', guaranteedIncomeCode);
        setValue(body, 'basicConditions.guaranteedIncome.guaranteedIncomeDescription', guaranteedIncomeDescription);
    }

    // med pro products
    if (!isCollectivePolicy && productGroupArray.MEDPRO.includes(productCode)) { setValue(body, 'insuredPerson.isPolicyHolder', true); }

    // insurance rules
    clientViewModel.insuranceRules = copyInsuranceRulesToClientViewModel(productConf);
    setValue(body, 'insuranceRules', {});

    // additional services
    if (body.mainInsuranceConditions.insuranceProduct.productGroup != 'credit') {
        setValue(body, 'additionalServices', []);
    }

    // always clear secondary declaration for AccumulatedLifeInsuranceQuote
    if (isAccumulatedLifeInsuranceQuote && (!isOnReview && (isOnChangeIssueDate || isOnChangePaymentFrequency) || isOnChangeInsuranceProduct)) {
        setValue(body, 'declarationMedicalConfirmationPolicyHolder', {});
        setValue(body, 'declarationMedicalPolicyHolder', []);
    }

    // rate of return
    if (body.basicInvestmentParameters?.variant?.variantCode || body.basicInvestmentParameters?.rateOfReturn) {
        rateOfReturnCleanSelected(body, self, ambientProperties);
        result.push({
            messageText: 'сброшен вариант',
            dataProperty: 'variant'
        });
        result.push({
            messageText: 'сброшена ставка доходности',
            dataProperty: 'rateOfReturn'
        });
    }

    // rate of return equity and actives
    if ([constants.productCode.EquityLifeInsuranceQuote, constants.productCode.InvestmentLifeInsuranceQuote].includes(ambientProperties.configurationCodeName)) {
        clientViewModel.rateOfReturnRulesEquityActives = await getRateOfReturnRulesEquityActives(body, ambientProperties);
    }

    if (body.additionalInvestmentParameters?.commWithdrawalFundsArray || body.additionalInvestmentParameters?.rateOfReturnEquityActives) {
        rateOfReturnEquityActivesClean(body);
        cleanManualRateCommission(body);
        result.push({
            messageText: 'сброшены дополнительные параметры инвестирования',
            dataProperty: 'rateOfReturnEquityActives'
        });
    }

    await rateOfReturnSetOptions(body, self, ambientProperties);
    rateOfReturnSetData(body, self, ambientProperties);
    setConsent(body);

    return result;
}

function setConsent(body) {
    body.consent = {};

    const consentToDataTransferingFNS = body.productConfiguration.consentToDataTransferingFNS;
    let insuranceDuration = null;

    if (body.migrationAttributes?.isMigrated) {
        insuranceDuration = DateTimeUtils.getYearNumber(body.policyTerms.startDate, body.policyTerms.endDate);
    }
    else {
        insuranceDuration = body.basicConditions.insuranceTerms;
    }

    if (insuranceDuration >= 5 && consentToDataTransferingFNS) {
        body.consent.consentToDataTransferingFNS = true;
    }
    else {
        body.consent.consentToDataTransferingFNS = false;
    }
}

async function getAllProducts(ambientProperties) {

    let allProducts = [];

    const requestProducts = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {}
            }
        }
    };

    const result = await ambientProperties.services.api.call(requestProducts);

    allProducts = result.data.map(item => {
        return {
            productCode: item.resultData.productCode,
            productGroup: item.resultData.productGroup
        };
    });

    return allProducts;

}

async function getRecommendedStrategies(input, self, ambientProperties) {

    let recommendedStrategies = [];

    if (ambientProperties.configurationCodeName != 'InvestmentLifeInsuranceQuote') {
        return;
    }

    const body = input.context?.Body ?? input;

    const issueDate = body?.basicConditions?.issueDate || DateTimeUtils.newDateAsString();
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;

    if (!productCode || !issueDate) {
        return;
    }

    const requestRecommendedStrategies = {
        method: 'POST',
        url: `api/entity-infrastructure/shared/datasource/RecommendedStrategiesDataSource`,
        data: {
            data: {
                criteria: {
                    productCode: productCode,
                    recommendationDate: issueDate
                }
            }
        }
    };

    await ambientProperties.services.api
        .call(requestRecommendedStrategies)
        .then(result => {
            recommendedStrategies = result.data.map(item => {
                return {
                    strategyDescription: item.resultData.strategyDescription,
                    strategyCode: item.resultData.strategyCode,
                    recommendationText: item.resultData.recommendationText
                };
            });
            return recommendedStrategies;
        });

}

async function rateOfReturnSetOptions(body, self, ambientProperties) {

    if (rateOfReturnIsCorrectProduct(body)) {

        const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
        const strategyCode = body.basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode;
        const issueDate = body.basicConditions.issueDate;
        const insuranceTerms = body.basicConditions.insuranceTerms;
        const currencyCode = body.basicConditions.currency.currencyCode;
        const guaranteedIncome = body.basicConditions.guaranteedIncome.guaranteedIncomeCode;

        const ratesOfReturn = await getRateOfReturnRules(ambientProperties, productCode, strategyCode, issueDate, insuranceTerms, currencyCode, guaranteedIncome);

        rateOfReturnSetOptionsFilter(body, ratesOfReturn);
    }
}

function rateOfReturnSetOptionsFilter(body, ratesOfReturn) {

    const technicalInformation = body?.technicalInformation ?? {};
    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const selectedVariant = body?.basicInvestmentParameters?.variant?.variantCode;
    const selectedRateOfReturn = body?.basicInvestmentParameters?.rateOfReturn;
    const selectedCashback = body?.basicInvestmentParameters?.cashback;

    let ratesOfReturnVariants = [];
    let ratesOfReturnCashback = [];

    if (ratesOfReturn.length > 0) {

        const IBAVTBUltra = [product.IBAV3VTB, product.IBAV5VTB].includes(productCode);

        ratesOfReturn = ratesOfReturn.map(i => ({
            excelRowNumber: i.excelRowNumber,
            productCode: i.productCode,
            issueDateFrom: i.issueDateFrom,
            issueDateTo: i.issueDateTo,
            issueDateStr: i.issueDateStr,
            insuranceTerms: i.insuranceTerms,
            currencyCode: i.currencyCode,
            guaranteedIncome: i.guaranteedIncome,
            variant: i.variant,
            rateOfReturn: IBAVTBUltra ? round(i.participationCoeff, 4) : round(i.rateOfReturn, 4),
            cashback: round(i.cashback, 4),
            rko: round(i.rko, 6),
            participationCoeff: round(i.participationCoeff, 4),
            manualRate: round(i.manualRate, 4),
            importDocumentId: i.importDocumentId,
            version: i.version,
            loadedBy: i.loadedBy,
            loadDate: i.loadDate,
        }));

        ratesOfReturnVariants = ratesOfReturn
            .filter(i => i.variant)
            .map(i => ({
                variant: i.variant
            }));

        ratesOfReturnCashback = ratesOfReturn
            .filter(i => i.cashback)
            .map(i => ({
                cashback: i.cashback
            }));
    }

    if (selectedVariant) {
        ratesOfReturn = ratesOfReturn.filter(i => i.variant == selectedVariant);
    }

    technicalInformation.ratesOfReturn = ratesOfReturn;
    technicalInformation.ratesOfReturnVariants = ratesOfReturnVariants;
    technicalInformation.ratesOfReturnCashback = ratesOfReturnCashback;
}

function rateOfReturnCleanSelected(body, self, ambientProperties, currentVariant) {

    if (body.basicInvestmentParameters) {

        body.basicInvestmentParameters.rateOfReturn = undefined;
        body.basicInvestmentParameters.cashback = undefined;
        body.basicInvestmentParameters.rateOfReturnManualRate = undefined;
        body.basicInvestmentParameters.variant = {};

        if (currentVariant?.variantCode) {
            body.basicInvestmentParameters.variant = currentVariant;
        }
    }

    const commission = body.commission;

    if (commission) {

        if (commission.tempData) {
            commission.tempData.manualRate = undefined;
        }

        if (commission.policyCommissionItems?.length > 0) {
            commission.policyCommissionItems.forEach(item => {
                item.manualRate = undefined;
            });
        }
    }
}

function rateOfReturnSetData(body, self, ambientProperties) {

    if (rateOfReturnIsCorrectProduct(body)) {

        const technicalInformation = body?.technicalInformation;
        const selectedVariant = body?.basicInvestmentParameters?.variant?.variantCode;
        const ratesOfReturn = technicalInformation?.ratesOfReturn ?? [];

        if (selectedVariant && ratesOfReturn?.length == 1) {
            body.basicInvestmentParameters.rateOfReturn = ratesOfReturn[0].rateOfReturn;
            body.basicInvestmentParameters.cashback = ratesOfReturn[0].cashback;
        }

        if (!selectedVariant && ratesOfReturn?.length > 0) {

            const rateOfReturn = body.basicInvestmentParameters.rateOfReturn;
            const selectedRateOfReturn = ratesOfReturn.filter(i => i.rateOfReturn == rateOfReturn);

            body.basicInvestmentParameters.rateOfReturnManualRate = selectedRateOfReturn[0]?.manualRate;

            if (selectedRateOfReturn.participationCoeff) {
                body.basicInvestmentParameters.participationCoeff = selectedRateOfReturn[0]?.participationCoeff;
            }

            const commission = body.commission;

            if (commission) {

                if (!commission.tempData) {
                    commission.tempData = {};
                }

                commission.tempData.manualRate = body.basicInvestmentParameters.rateOfReturnManualRate;

                if (commission.policyCommissionItems?.length > 0) {
                    commission.policyCommissionItems.forEach(item => {
                        item.manualRate = undefined;
                    });
                    commission.policyCommissionItems.filter(i => i.calculatedRate).forEach(item => {
                        item.manualRate = commission.tempData.manualRate;
                    });
                }

            }
        }

        technicalInformation.ratesOfReturn = ratesOfReturn.filter(i => i.rateOfReturn);
    }
}

function rateOfReturnIsCorrectProduct(body, self, ambientProperties) {

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const riskPremium = body?.basicConditions?.riskPremium;
    const issueDate = body?.basicConditions?.issueDate;
    const currencyCode = body?.basicConditions?.currency?.currencyCode;
    const isRUB = currencyCode == 'RUB';
    const isUSD = currencyCode == 'USD';
    const isEUR = currencyCode == 'EUR';
    const isDateNew = DateTimeUtils.isBefore(issueDate, '2024-10-14');
    const ratePremiumLimit = isDateNew ? 1000000 : 350000;

    return issueDate &&
        (
            productGroupArray.RATE_OF_RETURN.includes(productCode) ||
            productGroupArray.PRODUCTS_WITH_SPECIAL_OFFER.includes(productCode) ||
            (productGroupArray.RATE_OF_RETURN_PREMIUM_LIMIT.includes(productCode) &&
                ((isRUB && riskPremium >= ratePremiumLimit) || (isUSD || isEUR) && riskPremium >= 10000))
        );
}

function rateOfReturnNotification(body, self, ambientProperties) {

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions.issueDate;
    const insuranceTerms = body.basicConditions.insuranceTerms;
    const currencyCode = body.basicConditions.currency.currencyCode;
    const guaranteedIncome = body.basicConditions.guaranteedIncome.guaranteedIncomeCode;
    const selectedVariantCode = body?.basicInvestmentParameters?.variant?.variantCode;
    const selectedVariantDescription = body?.basicInvestmentParameters?.variant?.variantDescription;
    const selectedRateOfReturn = body?.basicInvestmentParameters?.rateOfReturn;
    const selectedCashback = body?.basicInvestmentParameters?.cashback;
    const ratesOfReturn = body?.technicalInformation?.ratesOfReturn ?? [];
    const ratesOfReturnVariants = body?.technicalInformation?.ratesOfReturnVariants ?? [];
    const ratesOfReturnCashback = body?.technicalInformation?.ratesOfReturnCashback ?? [];

    const productInfo = `
            Код продукта: ${productCode}.
            Дата заключения: ${issueDate}.
            Срок страхования: ${insuranceTerms}.
            Валюта: ${currencyCode}.
            Выплата с гар. доходом: ${guaranteedIncome}.
            Вариант: ${selectedVariantDescription} (${selectedVariantCode}).
        `;

    const ratesOfReturnExists = ratesOfReturnVariants.length > 0;
    const cashbackExists = ratesOfReturnCashback.length > 0;

    if (selectedVariantCode) {

        if (ratesOfReturnExists.length == 0 && cashbackExists.length == 0) {
            ambientProperties?.services?.confirmationDialog?.showWarning(
                `Ставка доходности или кэшбэк не подобраны.
                    Проверьте файл конфигурации.
                    ${productInfo}`,
                'OK', 'OK', 2
            );
        }

        if (ratesOfReturnExists.length > 0 && cashbackExists.length > 0) {
            ambientProperties?.services?.confirmationDialog?.showWarning(
                `Одновременно подобрана ставка доходности и кэшбэк.
                    Проверьте файл конфигурации.
                    ${productInfo}`,
                'OK', 'OK', 2
            );
        }

        if (ratesOfReturnExists.length > 1 || cashbackExists.length > 1) {
            ambientProperties?.services?.confirmationDialog?.showWarning(
                `Существует более одного варианта ставки доходности или кэшбэка.
                    Проверьте файл конфигурации.
                    ${productInfo}`,
                'OK', 'OK', 2
            );
        }
    }

}

function setManualRateCommission(body, newManualRate) {

    const commission = body?.commission;

    if (commission && newManualRate) {

        if (!commission.tempData) {
            commission.tempData = {};
        }

        commission.tempData.manualRate = newManualRate;

        if (commission.policyCommissionItems?.length > 0) {
            commission.policyCommissionItems.forEach(item => {
                item.manualRate = undefined;
            });
            commission.policyCommissionItems.filter(i => i.calculatedRate).forEach(item => {
                item.manualRate = newManualRate;
            });
        }

    }
}

function cleanManualRateCommission(body) {

    const commission = body?.commission;

    if (commission) {

        if (!commission.tempData) {
            commission.tempData = {};
        }

        commission.tempData.manualRate = undefined;

        if (commission.policyCommissionItems?.length > 0) {
            commission.policyCommissionItems.forEach(item => {
                item.manualRate = undefined;
            });
        }

    }
}

function rateOfReturnEquityActivesClean(body) {

    if (body.additionalInvestmentParameters) {

        body.additionalInvestmentParameters.commWithdrawalFundsArray = [];
        body.additionalInvestmentParameters.rateOfReturnEquityActives = {};
    }
}

function getCashBackCoeff(productCode, issueDate, body, term, isCollectivePolicy, cashback) {

    const selectedCashback = cashback ?? body?.basicInvestmentParameters?.cashback;
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;
    const cashBackCoeffProductConf = productConf && productConf.cashBackCoeff && (productConf.cashBackCoeff[term] || productConf.cashBackCoeff['any']) || 1;

    let cashBackCoeff = selectedCashback;

    if (!selectedCashback || (selectedCashback && selectedCashback == 0)) {
        cashBackCoeff = cashBackCoeffProductConf;
    }

    return cashBackCoeff;
}

module.exports = {
    handleOnChangeInsuranceProduct,
    processProductSelection,
    getAllProducts,
    getRecommendedStrategies,
    rateOfReturnSetOptions,
    rateOfReturnSetOptionsFilter,
    rateOfReturnCleanSelected,
    rateOfReturnSetData,
    rateOfReturnIsCorrectProduct,
    rateOfReturnNotification,
    getCashBackCoeff,
    setConsent,
    setManualRateCommission,
    cleanManualRateCommission,
    rateOfReturnEquityActivesClean
};
