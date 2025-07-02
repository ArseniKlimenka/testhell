'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { attributeTypes } = require('@config-rgsl/life-insurance/lib/contractEntityAttributesImportHelper');

module.exports = function mapping(input, sinkExchange) {

    const body = sinkExchange.contractEntityData.body;
    const code = sinkExchange.contractEntityData.universalMasterEntityCode;
    const attributeType = this.businessContext.etlServiceInput.attributeType;

    body.lastUpdateDate = DateTimeUtils.dateTimeNow();

    if (attributeType == attributeTypes.originalReceiptDate) {
        body.receivedDocuments.originalReceiptDate = input.data.originalReceiptDate;
    }

    if (attributeType == attributeTypes.hasAmendment) {
        body.receivedDocuments.hasAmendment = input.data.hasAmendment.toLowerCase() == 'Да';
    }

    if (attributeType == attributeTypes.paymentIntermediateApplication) {
        delete body.receivedDocuments.paymentIntermediateApplicationDate;
        body.receivedDocuments.hasPaymentIntermediateApplication = input.data.hasPaymentIntermediateApplication.toLowerCase() == 'да';
        if (body.receivedDocuments.hasPaymentIntermediateApplication) {
            body.receivedDocuments.paymentIntermediateApplicationDate = input.data.paymentIntermediateApplicationDate;
        }
    }

    return {
        code: code,
        body: body
    };
};
