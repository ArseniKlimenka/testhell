'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};

    output.paymentOrderNumber = nullCheck(input.PAYMENT_ORDER_NUMBER);
    output.paymentOrderType = nullCheck(input.PAYMENT_ORDER_TYPE);
    output.paymentOrderDate = nullCheck(input.PAYMENT_ORDER_DATE);
    output.paymentOrderState = translationUtils.getTranslation(`document/PaymentOrder/1`, 'states', null, input.PO_SATE);
    output.relatedDocumentNumber = nullCheck(input.DOCUMENT_NUMBER);
    output.relatedDocumentSeqNumber = nullCheck(input.DOC_SEQ_NUMBER);
    output.relatedDocumentParentNumber = nullCheck(input.DOC_PARENT_NUMBER);
    output.relatedDocumentState = translationUtils.getTranslation(`document/${input.DOC_CONF}/1`, 'states', null, input.DOC_STATE);
    output.relatedDocumentStateDate = nullCheck(input.DOC_STATE_DATE);
    output.relatedDocumentConf = nullCheck(input.DOC_CONF);
    output.relatedDocumentEntType = nullCheck(input.DOC_ENTITY_TYPE);

    return output;
};
