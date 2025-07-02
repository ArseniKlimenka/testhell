"use strict";

const { generate } = require('@config-rgsl/infrastructure/lib/GuidHelper');
const { prepareGetContractsRequestData } = require('@config-rgsl/party/lib/KPKHelper');
const { preparePartyBody } = require('@config-rgsl/credit-life-insurance/lib/creditImportHelper');

module.exports = function mappingFunction(lineInput, sinkExchange) {

    const document = prepareDocument(lineInput);
    const partyBody = preparePartyBody(lineInput, sinkExchange, this);
    const requestData = prepareGetContractsRequestData(partyBody, document);

    return {
        request: JSON.stringify(requestData)
    };
};

function prepareDocument(lineInput) {

    const document = {};

    document.fullName = lineInput.data.lastName + " " + lineInput.data.firstName;
    if (lineInput.data.middleName) { document.fullName = document.fullName + " " + lineInput.data.middleName; }

    document.partyId = generate();
    document.role = "Клиент";
    document.endDate = lineInput.data.endDate;
    document.issueDate = lineInput.data.issueDate;
    document.entityId = generate();
    document.DocumentNumber = lineInput.data.policySeries + "-" + lineInput.data.policyNumber;
    document.Representation = "Договор " + document.DocumentNumber;

    return document;
}
