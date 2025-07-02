module.exports = function getInitialAmendmentBody(initialDocument) {

    const updatedDocument = map(initialDocument);

    return { body: updatedDocument };
};

const map = function (initialDocument) {

    const result = new Object();
    result.mainInsuranceConditions = initialDocument.mainInsuranceConditions;
    result.additionalServices = initialDocument.additionalServices;
    result.policyTerms = initialDocument.policyTerms;
    result.initiator = initialDocument.initiator;
    result.paymentPlan = initialDocument.paymentPlan;
    result.basicConditions = initialDocument.basicConditions;
    result.insuranceRules = initialDocument.insuranceRules;
    result.insuredPerson = initialDocument.insuredPerson;
    result.issueForm = initialDocument.issueForm;
    result.risks = initialDocument.risks;
    result.surrenderValues = initialDocument.surrenderValues;
    result.commission = initialDocument.commission;
    result.risksPackages = initialDocument.risksPackages;
    result.additionalInitiators = initialDocument.additionalInitiators;
    result.amendmentData = initialDocument.amendmentData;
    result.declarationSportConfirmation = initialDocument.declarationSportConfirmation;
    result.declarationSport = initialDocument.declarationSport;
    result.additionalInitiators = initialDocument.additionalInitiators;

    return result;
};
