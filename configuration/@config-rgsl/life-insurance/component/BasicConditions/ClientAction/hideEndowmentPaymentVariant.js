'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { productGroupArray, product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideEndowmentPaymentVariant(input, ambientProperties) {

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    if (isCollectivePolicy) {
        return true;
    }

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.componentContext.issueDate ?? dateTimeUtils.newDateAsString();

    if (!productCode) {
        return false;
    }

    const showEndowmentPaymentVariantForProductCodes = [...productGroupArray.RHE, ...productGroupArray.MEDPRO].includes(productCode);

    const isTERMVVTB = productCode == product.TERMVVTB;

    if (showEndowmentPaymentVariantForProductCodes || isTERMVVTB) {
        return true;
    }

    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const isWholeLife = productConf.isWholeLife;

    if (isWholeLife) { return true; }

    const configurationCodeName = input.context.ConfigurationCodeName;
    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const isEquity = [
        lifeInsuranceConstants.productCode.EquityLifeInsuranceQuote,
        lifeInsuranceConstants.productCode.EquityLifeInsurancePolicy
    ].includes(configurationCodeName);
    const isAgent = currentActor == 'Agent';

    if (isEquity && isAgent) {
        return true;
    }

    return false;

};
