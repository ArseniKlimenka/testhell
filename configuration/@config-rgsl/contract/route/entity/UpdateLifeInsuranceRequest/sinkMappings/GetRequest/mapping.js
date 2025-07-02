'use strict';

module.exports = function mapInput(input, sinkExchange) {

    sinkExchange.requestLastAmendment = input?.body?.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.lastAmendment;

    const requestNumber = input?.body?.amendmentData?.nonFinChangeAmendmentData?.technicalData?.requestData?.number;
    if (!requestNumber) {
        return null;
    }

    if (requestNumber) {

        sinkExchange.requestNumber = requestNumber;

        return {
            input: {
                data: {
                    criteria: {
                        universalDocumentNumber: requestNumber
                    }
                }
            }
        };

    }
    return null;


};
