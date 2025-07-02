'use strict';

const { updateInquiryTextOfAnswer } = require('@config-rgsl/life-insurance/lib/approveInquiryHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    return updateInquiryTextOfAnswer(sinkInput, sinkExchange, this, 'LifeInsuranceInquiry');

};
