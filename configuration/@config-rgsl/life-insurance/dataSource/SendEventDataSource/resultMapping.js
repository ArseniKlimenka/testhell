module.exports = function resultMapping(input) {

    const output = {};

    output.sendEventId = input.SEND_EVENT_ID;
    output.eventType = input.EVENT_TYPE;
    output.subscriber = input.SUBSCRIBER;
    output.documentNumber = input.DOCUMENT_NUMBER;
    output.productCode = input.PRODUCT_CODE;
    output.request = input.REQUEST;
    output.response = input.RESPONSE;
    output.status = input.STATUS;
    output.updatedDate = input.UPDATED_DATE;
    output.createdDate = input.CREATED_DATE;

    return output;
};
