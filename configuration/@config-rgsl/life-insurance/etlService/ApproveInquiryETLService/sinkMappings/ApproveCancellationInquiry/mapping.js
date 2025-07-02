'use strict';

const { checkInquiryType } = require('@config-rgsl/life-insurance/lib/approveInquiryHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    if (!checkInquiryType(sinkInput, sinkExchange, this, 'CancellationInquiry')) {
        return;
    }

    const result = {
        businessNumber: sinkExchange.globalContext.universalDocumentNumber
    };

    return result;
};
