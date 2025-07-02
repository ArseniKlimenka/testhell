module.exports = function resultMapping(input) {

    return {

        sendEventId: input.SEND_EVENT_ID,
        request: input.REQUEST,
        response: input.RESPONSE,
        additionalData: input.SEND_EVENT_ADDITIONAL_DATA
    };
};
