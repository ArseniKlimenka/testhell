'use strict';

const productConfiguration = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (body.issueForm?.code?.issueFormCode) {
        return;
    }

    body.issueForm = {};

    const productConf = productConfiguration({
        productCode: body.mainInsuranceConditions?.insuranceProduct?.productCode,
        issueDate: body.basicConditions?.issueDate,
    });

    const items = dataSourceResponse
        .data
        .map(_ => _.resultData)
        .filter(_ => productConf?.paperTypes.includes(_.issueFormCode));

    body.issueForm.code = items[0];
};
