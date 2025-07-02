module.exports = function getInitialAmendmentBody(initialDocument) {

    const updatedDocument = map(initialDocument);

    return { body: updatedDocument };
};

const map = function (initialDocument) {

    const result = new Object();
    result.basicInvestmentParameters = initialDocument.basicInvestmentParameters;
    result.mainInsuranceConditions = initialDocument.mainInsuranceConditions;
    result.additionalServices = initialDocument.additionalServices;
    result.policyTerms = initialDocument.policyTerms;
    result.initiator = initialDocument.initiator;
    result.paymentPlan = initialDocument.paymentPlan;
    result.basicConditions = initialDocument.basicConditions;
    result.insuranceRules = initialDocument.insuranceRules;
    result.policyHolder = initialDocument.policyHolder;
    result.insuredPerson = initialDocument.insuredPerson;
    result.issueForm = initialDocument.issueForm;
    result.risks = initialDocument.risks;
    result.surrenderValues = initialDocument.surrenderValues;
    result.commission = initialDocument.commission;
    result.risksPackages = initialDocument.risksPackages;
    result.amendmentData = initialDocument.amendmentData;
    result.productConfiguration = initialDocument.productConfiguration;

    return result;
};
