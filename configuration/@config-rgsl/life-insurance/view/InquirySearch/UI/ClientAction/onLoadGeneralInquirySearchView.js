'use strict';

module.exports = async function onLoadGeneralInquirySearchView(input, ambientProperties) {

    if (!input.context.request.data.criteria.inquiryState) {
        input.context.request.data.criteria.inquiryState = 'Draft';
    }

};
