'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.configurationId = input.SEND_EVENT_CONFIGURATION_ID;
    output.eventTypeId = input.SEND_EVENT_TYPE_ID;
    output.eventTypeName = input.SEND_EVENT_TYPE_NAME;
    output.subscriber = input.SUBSCRIBER;
    output.entityId = input.ENTITY_CODE;
    output.eventCode = input.EVENT_CODE;
    output.beginDate = input.BEGIN_DATE;
    output.endDate = input.END_DATE;
    output.apiSender = input.API_SENDER;
    output.isRecordDisabled = input.IS_RECORD_DISABLED;

    return output;
};
