'use strict';

const { DateTimeFormatter, ZonedDateTime, ZoneOffset } = require('@js-joda/core');

module.exports = function mapping(sinkInput, sinkExchange) {

    const currentUser = this?.applicationContext?.originatingUser;
    const executedOn = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.n'));
    const executionId = sinkExchange.resolveContext('executionId');
    const contractData = sinkExchange.resolveContext('contractData');
    const initialData = sinkExchange.resolveContext('initialData');
    const updatedData = sinkExchange.resolveContext('updatedData');

    return {
        'BFX_IMPL.CONTRACT_MODIFICATION_HISTORY': [
            {
                EXECUTION_ID: executionId,
                EXECUTED_ON: executedOn,
                EXECUTED_BY: currentUser?.id,
                MODIFICATION_TYPE: 'fullContract',
                CONTRACT_NUMBER: sinkInput.contractNumber,
                CONFIGURATION_NAME: contractData.CodeName,
                ORIGINAL_CONTRACT_NUMBER: contractData.OriginalContractNumber,
                SEQ_NUMBER: contractData.Sequence,
                ORIGINAL_DATA: JSON.stringify(initialData),
                MODIFIED_DATA: JSON.stringify(updatedData),
            }
        ]
    };
};

