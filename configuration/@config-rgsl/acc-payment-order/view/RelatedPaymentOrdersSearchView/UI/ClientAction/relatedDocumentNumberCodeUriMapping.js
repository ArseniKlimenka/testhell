'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { paymentOrderType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function relatedDocumentNumberCodeUriMapping(input) {

    const poType = getValue(input, 'data.resultData.paymentOrderType');
    const documentNumber = getValue(input, 'data.resultData.relatedDocumentNumber');
    const relatedDocumentConf = getValue(input, 'data.resultData.relatedDocumentConf');
    const relatedDocumentEntType = getValue(input, 'data.resultData.relatedDocumentEntType');
    const relatedDocumentSeqNumber = getValue(input, 'data.resultData.relatedDocumentSeqNumber');
    const relatedDocumentParentNumber = getValue(input, 'data.resultData.relatedDocumentParentNumber');

    if (poType === paymentOrderType.PolicyCancellation && documentNumber && relatedDocumentConf && relatedDocumentEntType) {

        return uriBuilder.getContractAmendmentUri(relatedDocumentEntType, relatedDocumentConf, documentNumber);
    }
    else if (poType === paymentOrderType.Claim && documentNumber) {

        return uriBuilder.getClaimUri(documentNumber);
    }
};
