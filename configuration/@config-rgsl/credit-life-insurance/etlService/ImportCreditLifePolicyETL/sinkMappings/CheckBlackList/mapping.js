"use strict";

const { generate } = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { prepareCheckBlackListRequestData } = require('@config-rgsl/party/lib/KPKHelper');
const creditImportHelper = require('@config-rgsl/credit-life-insurance/lib/creditImportHelper');

module.exports = function mappingFunction(lineInput, sinkExchange, additionalDataSourcesResults) {

    const document = prepareDocument(lineInput, sinkExchange, additionalDataSourcesResults);
    const partyBody = creditImportHelper.preparePartyBody(lineInput, sinkExchange, this);
    const userId = this.applicationContext.originatingUser.id;
    const userName = this.applicationContext.originatingUser.username;
    const requestData = prepareCheckBlackListRequestData(partyBody, document, userId, userName);

    return {
        request: JSON.stringify(requestData)
    };
};

function prepareDocument(lineInput, sinkExchange, additionalDataSourcesResults) {

    const document = {};

    lineInput.data.endDate = creditImportHelper.endDateCheck(
        lineInput.data.policySeries,
        lineInput.data.issueDate,
        lineInput.data.startDate,
        lineInput.data.endDate,
        lineInput.data.dateOfBirth,
        lineInput.data.creditProgramId,
        additionalDataSourcesResults
    );

    document.fullName = lineInput.data.lastName + " " + lineInput.data.firstName;
    if (lineInput.data.middleName) { document.fullName = document.fullName + " " + lineInput.data.middleName; }

    document.partyId = generate();
    document.role = "Клиент";
    document.endDate = lineInput.data.endDate;
    document.issueDate = lineInput.data.issueDate;
    document.entityId = generate();
    document.DocumentNumber = lineInput.data.policySeries + "-" + lineInput.data.policyNumber;
    document.Representation = "Договор " + document.DocumentNumber;

    const insuranceProduct = creditImportHelper.getProductBySeries(lineInput.data.policySeries, lineInput.data.issueDate, lineInput.data.creditProgramId, additionalDataSourcesResults);
    document.productCode = insuranceProduct.productCode;
    document.productDescription = insuranceProduct.productDescription;

    // creditImportHelper.tariffCheck(lineInput.data, additionalDataSourcesResults);
    creditImportHelper.JL42204Check(lineInput.data, additionalDataSourcesResults);
    creditImportHelper.CreditAndPolicyTermsCorrelationCheck(lineInput.data, additionalDataSourcesResults);
    creditImportHelper.CMCConditionsCheck(lineInput.data, additionalDataSourcesResults);

    return document;
}
