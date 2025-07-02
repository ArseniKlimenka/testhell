'use strict';

module.exports = function mapping(sinkInput) {

    const record = {
        SEND_EVENT_ID: sinkInput.sendEventId,
        EVENT_TYPE: sinkInput.eventType,
        SUBSCRIBER: sinkInput.subscriber,
        DOCUMENT_NUMBER: sinkInput.documentNumber,
        PRODUCT_CODE: sinkInput.productCode,
        REQUEST: sinkInput.request,
        RESPONSE: sinkInput.response,
        STATUS: sinkInput.status,
        UPDATED_DATE: sinkInput.updatedDate,
        CREATED_DATE: sinkInput.createdDate
    };

    return {
        'BFX_IMPL.SEND_EVENT_HISTORY': [ record ]
    };
};

