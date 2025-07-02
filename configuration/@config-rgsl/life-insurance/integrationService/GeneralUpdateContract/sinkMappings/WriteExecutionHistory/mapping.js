'use strict';

const { DateTimeFormatter, ZonedDateTime, ZoneOffset } = require('@js-joda/core');

module.exports = function mapping(sinkInput, sinkExchange) {

    const currentUser = this?.applicationContext?.originatingUser;
    const executedOn = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.n'));
    const executionId = sinkExchange.resolveContext('executionId');
    const docsToUpdate = sinkExchange.resolveContext('docsToUpdate');
    const serviceInput = sinkExchange.resolveContext('serviceInput');

    return {
        'BFX_IMPL.CONTRACT_MODIFICATION_HISTORY': docsToUpdate?.map(doc => (
            {
                EXECUTION_ID: executionId,
                EXECUTED_ON: executedOn,
                EXECUTED_BY: currentUser?.id,
                MODIFICATION_TYPE: serviceInput.modificationType,
                CONTRACT_NUMBER: doc.number,
                CONFIGURATION_NAME: doc.conf,
                ORIGINAL_CONTRACT_NUMBER: serviceInput.contractNumber,
                SEQ_NUMBER: doc.seq,
                ORIGINAL_DATA: JSON.stringify(doc.originalData),
                MODIFIED_DATA: JSON.stringify(doc.modifiedData),
            })) ?? []
    };
};
