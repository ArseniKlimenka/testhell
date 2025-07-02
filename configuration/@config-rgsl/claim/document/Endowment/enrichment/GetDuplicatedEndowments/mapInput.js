'use strict';

module.exports = function mapping(input) {

    const contractNumber = input.mainAttributes?.contract?.number;
    const currentEventDate = input.mainAttributes?.applicationInfo?.eventDate;
    const eventTypeCode = input.mainAttributes?.eventType?.code;
    const eventReasonCode = input.mainAttributes?.eventReason?.code;

    if (!contractNumber || !currentEventDate || !eventTypeCode || !eventReasonCode) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumber: contractNumber,
                eventType: eventTypeCode,
                eventReason: eventReasonCode,
                eventDate: currentEventDate,
                onlyNotCancelled: true
            }
        }
    };
};

