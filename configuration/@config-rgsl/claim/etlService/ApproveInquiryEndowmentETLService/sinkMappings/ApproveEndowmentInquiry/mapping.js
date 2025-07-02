'use strict';

const { checkInquiryType } = require('@config-rgsl/life-insurance/lib/approveInquiryHelper');

module.exports = function mapping(sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (!checkInquiryType(sinkInput, sinkExchange, this, 'EndowmentInquiry')) {

        return;
    }

    const result = {
        businessNumber: sinkExchange.globalContext.universalDocumentNumber
    };

    return result;
};
