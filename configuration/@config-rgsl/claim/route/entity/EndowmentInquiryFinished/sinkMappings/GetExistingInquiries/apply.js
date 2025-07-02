'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (sinkResult?.data?.length > 0) {

        const number = sinkExchange.currentInquiryNumber;
        const inquiries = sinkResult.data.map(d => d.resultData).filter(i => i.inquiryNumber !== number);
        const hasActiveInquiries = inquiries.some(i => i.stateCode === 'Draft');

        sinkExchange.hasActiveInquiries = hasActiveInquiries;
    }
};
