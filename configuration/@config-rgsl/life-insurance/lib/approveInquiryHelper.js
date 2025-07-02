'use strict';

function getUniversalDocumentsMapping(sinkInput, sinkExchange) {

    const universalDocumentNumbers = sinkInput.universalDocumentNumbers;

    if (universalDocumentNumbers?.length > 0) {

        const inquiryNumbers = universalDocumentNumbers.map(i => i.inquiryNumber);

        return {
            data: {
                criteria: {
                    universalDocumentNumbers: inquiryNumbers
                }
            }
        };

    }
    return null;

}

function updateInquiryTextOfAnswer(sinkInput, sinkExchange, mappingContext, inquiryType, textOfAnswer = 'Согласовано') {

    const isCorrectInquiryType = checkInquiryType(sinkInput, sinkExchange, mappingContext, inquiryType);

    if (!isCorrectInquiryType) {
        return;
    }

    sinkExchange.globalContext.universalDocumentNumber = sinkInput.universalDocumentNumber;

    const number = sinkInput.universalDocumentNumber;
    const body = sinkInput.body;

    if (sinkExchange.isLifeInsuranceInquiry) {
        body.inquiry.textOfAnswer = textOfAnswer;
    } else {
        body.textOfAnswer = textOfAnswer;
    }

    if (number && body) {
        return {
            body,
            number: number
        };
    }

}

function checkInquiryType(sinkInput, sinkExchange, mappingContext, inquiryType) {

    const configurationCodeName = mappingContext.businessContext.etlServiceInput.universalDocumentNumbers
        .filter(i => i.inquiryNumber = sinkInput.universalDocumentNumber)[0].inquiryCodeName;

    sinkExchange.isLifeInsuranceInquiry = configurationCodeName == 'LifeInsuranceInquiry';

    return configurationCodeName == inquiryType;
}

module.exports = {
    getUniversalDocumentsMapping,
    updateInquiryTextOfAnswer,
    checkInquiryType
};
