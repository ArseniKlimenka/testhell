'use strict';

const { getUniversalDocumentsMapping } = require('@config-rgsl/life-insurance/lib/approveInquiryHelper');

module.exports = function mapInput(sinkInput, sinkExchange, additionalDataSourcesData) {

    return getUniversalDocumentsMapping(sinkInput, sinkExchange);

};
