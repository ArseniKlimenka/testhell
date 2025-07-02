'use strict';

const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { refreshView } = require('@config-rgsl/life-insurance/lib/uiHelper');

module.exports = function onChangeIsReinvent(input, ambientProperties) {

    const body = input.context.Body;

    const productCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    if (!productCode || !input.componentContext) {
        return;
    }

    const issueDate = input.componentContext.issueDate ?? DateTimeUtils.newDateAsString();

    const isCollectivePolicy = ambientProperties.configurationCodeName == 'CollectiveLifeInsurancePolicy';
    const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate }) : body?.productConfiguration;

    const isReinvent = input.componentContext.isReinvest ?? false;
    input.componentContext.invoiceOnActivation = isReinvent && productConf?.invoiceOnActivationIfReinvest;

    refreshView(this.view);
};
