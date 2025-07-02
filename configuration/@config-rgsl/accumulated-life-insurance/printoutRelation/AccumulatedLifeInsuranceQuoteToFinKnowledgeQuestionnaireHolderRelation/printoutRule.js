'use strict';

module.exports = function rule(input) {

    const productCode = input.body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const issueDate = input.body.basicConditions?.issueDate;

    if (!productCode || !issueDate) {

        return;
    }

    const productConf = input.body?.productConfiguration ?? {};

    if (productConf.showFinKnowledgeQuestionnaire) {

        return true;
    }

    return;
};
