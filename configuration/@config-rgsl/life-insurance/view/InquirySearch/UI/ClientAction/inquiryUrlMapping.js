'use strict';

const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function inquiryUrlMapping(input) {

    const inquiryNumber = getValue(input, 'data.resultData.inquiryNumber');
    const inquiryCodeName = getValue(input, 'data.resultData.inquiryCodeName');

    return uriBuilder.getUniverslaDocumentUri(inquiryNumber, inquiryCodeName);

};
