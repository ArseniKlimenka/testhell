'use strict';

const { getMainRiskCode } = require('@config-rgsl/life-insurance/lib/lifeInsuranceHelperClient');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoad(input, ambientProperties) {

    const productCode = input.context.Body.mainInsuranceConditions?.insuranceProduct?.productCode;
    if (!productCode) {
        return;
    }

    try {
        this.view.startBlockingUI();
        input.context.ClientViewModel.mainRiskCode = await getMainRiskCode(productCode, ambientProperties);
        this.view.rebind();
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

};
