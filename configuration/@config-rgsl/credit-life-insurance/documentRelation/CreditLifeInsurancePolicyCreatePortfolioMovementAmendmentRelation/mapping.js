module.exports = function getInitialAmendmentBody(initialDocument) {

    const updatedDocument = map(initialDocument);

    return { body: updatedDocument };
};

const map = function (initialDocument) {

    const result = new Object();
    result.mainInsuranceConditions = initialDocument.mainInsuranceConditions;
    result.basicConditions = initialDocument.basicConditions;
    result.risks = initialDocument.risks;
    result.policyTerms = initialDocument.policyTerms;
    result.policyHolder = initialDocument.policyHolder;
    result.insuredPerson = initialDocument.insuredPerson;
    result.issueForm = initialDocument.issueForm;
    result.paymentPlan = initialDocument.paymentPlan;
    result.insuranceRules = initialDocument.insuranceRules;
    result.initiator = initialDocument.initiator;
    result.commission = initialDocument.commission;
    result.creditContract = initialDocument.creditContract;
    result.creditSalesPlace = initialDocument.creditSalesPlace;
    result.creditProgram = initialDocument.creditProgram;
    result.surrenderValues = initialDocument.surrenderValues;
    result.risksPackages = initialDocument.risksPackages;
    result.additionalInitiators = initialDocument.additionalInitiators;
    result.amendmentData = initialDocument.amendmentData;

    return result;
};
