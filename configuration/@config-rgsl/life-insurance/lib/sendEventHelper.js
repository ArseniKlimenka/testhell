"use strict";

const { LocalDateTime } = require('@js-joda/core');
const { generate } = require('@config-rgsl/infrastructure/lib/GuidHelper');
const sendEventConstant = require('@config-rgsl/life-insurance/lib/sendEventConstant');

function createRequest({ requestData, configuration }) {

    const request = {};

    request.systemCode = requestData.environmentVariables[`rgsl.sendEvent.${configuration.subscriber.toLowerCase()}.systemCode`];
    request.requestId = generate();
    request.eventId = generate();
    request.entityId = configuration.entityId;
    request.recId = requestData.recId;
    request.eventCode = configuration.eventCode;

    return request;
}

function createJsonRequest({ requestData, configuration }) {

    const request = {};
    const context = {};

    context.Id_Contractor_AdInsure = requestData.recId;
    context.requestid = generate();
    context.eventid = generate();
    context.eventcode = configuration.eventCode;

    request.context = context;
    JSON.stringify(request);

    return JSON.stringify(request);
}

function prepareJsonRequestCreateSportsmanInsurance({ requestData, configuration }) {

    const request = {};

    if (requestData.eventType == sendEventConstant.eventType.SportsmanContractIsActivated) {
        request.beginAt = requestData.beginAt;
        request.endAt = requestData.endAt;
        request.externalId = requestData.externalId;
    }

    JSON.stringify(request);

    return JSON.stringify(request);
}

function prepareJsonRequestDeleteSportsmanInsurance({ requestData, configuration }) {

    const request = {};

    JSON.stringify(request);

    return JSON.stringify(request);
}

function createSerializedRequest({ requestData, configuration }) {

    let request;

    if (configuration.subscriber == sendEventConstant.subscriber.ELMA365) {

        request = createJsonRequest({ requestData, configuration });
    }
    else if (configuration.subscriber == sendEventConstant.subscriber.SPORTSMAN_CREATE) {

        request = prepareJsonRequestCreateSportsmanInsurance({ requestData, configuration });
    }
    else if (configuration.subscriber == sendEventConstant.subscriber.SPORTSMAN_DELETE) {

        request = prepareJsonRequestDeleteSportsmanInsurance({ requestData, configuration });
    }
    else if (requestData.eventType == sendEventConstant.eventType.AllocationFinished) {

        request = requestData.requestBody;
    }
    else {
        request = createRequest({ requestData, configuration });
        request = objectToXml({ request }, '<?xml version="1.0" encoding="UTF-8"?>');
    }

    return request;
}

function createRecord({ requestData, configuration }) {

    const request = createSerializedRequest({ requestData, configuration });

    const record = {
        SEND_EVENT_ID: generate(),
        EVENT_TYPE: requestData.eventType,
        SUBSCRIBER: configuration.subscriber,
        DOCUMENT_NUMBER: requestData.documentNumber,
        PRODUCT_CODE: requestData.productCode,
        POLICY_HOLDER_TYPE: requestData.policyHolderType,
        AGENT_AGREEMENT_NUMBER: requestData.agentAgreementNumber,
        REQUEST: request,
        STATUS: sendEventConstant.eventStatus.Created,
        CREATED_DATE: LocalDateTime.now().toString(),
        NEED_TO_SEND: true,
        SEND_EVENT_ADDITIONAL_DATA: requestData.additionalData
    };

    return record;
}

function technicalInformationCheck(configuration, contractTechnicalInformation) {

    if (!configuration.apiSender) {
        return true;
    }

    if (!contractTechnicalInformation.creatorUsername && !contractTechnicalInformation.apiSender) {
        return true;
    }

    if ((contractTechnicalInformation.creatorUsername && contractTechnicalInformation.creatorUsername == configuration.apiSender)
        || (contractTechnicalInformation.apiSender && contractTechnicalInformation.apiSender == configuration.apiSender)) {
        return true;
    }

    return false;
}

function createSendEventRecords(requestData, configurations, contractTechnicalInformation) {

    const records = [];

    configurations
        .filter(_ => !_.isRecordDisabled)
        .forEach(configuration => {
            if (!(requestData.productGroup == 'credit' && configuration.subscriber == sendEventConstant.subscriber.AGIMA)
                && technicalInformationCheck(configuration, contractTechnicalInformation)) {

                const record = createRecord({ requestData, configuration });
                records.push(record);
            }
        });

    return records;
}

function objectToXml(obj, header) {
    let xml = header ? header : '';
    for (const prop in obj) {
        xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
        if (obj[prop] instanceof Array) {
            for (const array in obj[prop]) {
                xml += '<' + prop + '>';
                xml += objectToXml(new Object(obj[prop][array]));
                xml += '</' + prop + '>';
            }
        } else if (typeof obj[prop] == 'object') {
            xml += objectToXml(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : '</' + prop + '>';
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml;
}

module.exports = {
    createSendEventRecords
};
