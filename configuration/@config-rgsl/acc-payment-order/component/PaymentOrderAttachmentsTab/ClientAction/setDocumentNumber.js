const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function setDocumentNumber(input, ambientProperties) {

    const referenceNumber = getValue(input, 'context.Body.paymentOrderInformation.referenceNumber');

    if (referenceNumber) {

        return { 'document-number': referenceNumber };
    }
};
