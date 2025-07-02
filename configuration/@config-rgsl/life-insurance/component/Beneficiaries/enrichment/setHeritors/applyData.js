'use strict';

const { productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = body.basicConditions?.issueDate || dateTimeUtils.newDateAsString();

    if (!productCode) {
        return;
    }

    const productConf = body?.productConfiguration;
    if (!productConf) {
        return;
    }

    if (!body.beneficiaries) {
        body.beneficiaries = {};
    }

    if (productConf.isWholeLife) {
        body.beneficiaries.isHeritors = false;
        body.beneficiaries.isNotHeritors = true;
    }

    if (productGroupArray.MEDPRO.includes(productCode)) {
        body.beneficiaries.isHeritors = undefined;
        body.beneficiaries.isNotHeritors = undefined;
    }

};
