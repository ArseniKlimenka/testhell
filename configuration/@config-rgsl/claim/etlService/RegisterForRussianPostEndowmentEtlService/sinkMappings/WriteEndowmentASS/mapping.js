'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    if (!sinkExchange.shouldUpdateEndowmentInquiry) {

        return;
    }

    const inquiryData = sinkExchange.inquiryData;

    return {
        'EWT_IMPL.ENDOWMENT_INQUIRY_SAT': [
            {
                INQUIRY_NUMBER: inquiryData.requestNumber,
                STATE: inquiryData.requestCodeName,
                DEPARTMENT_CODE: inquiryData.requestBody.department.code,
                CONTRACT_NUMBER: inquiryData.requestBody.contractNumber,
                CONTRACT_HOLDER_NAME: inquiryData.requestBody.holder,
                CONTRACT_CONF_CODE_NAME: inquiryData.requestBody.contractConfigurationCodeName,
                TEXT_OF_INQUIRY: inquiryData.requestBody.textOfInquiry,
                INCLUDED_IN_RP_REGISTER: sinkExchange.shouldUpdateEndowmentInquiry,
                INCLUSION_DATE_RP_REGISTER: sinkExchange.currentDate
            }
        ]
    };
};
