'use strict';

const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function rule(input) {

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    if (!productCode || !issueDate) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};
    const isNOTE3BFKO = productCode == product.NOTE3BFKO;
    const isNOTE1BFKO = productCode == product.NOTE1BFKO;
    const isNOTE1BFKO3 = productCode == product.NOTE1BFKO3;
    const isNOTE1BFKO4 = productCode == product.NOTE1BFKO4;
    if (productConf.showFinKnowledgeQuestionnaire && !isNOTE3BFKO && !isNOTE1BFKO && !isNOTE1BFKO3 && !isNOTE1BFKO4) {

        return true;
    }
};
