'use strict';

module.exports = function insuredEventMapping({
    id,
    number,
    state,
    body,
    commonBody,
    originalDocumentNumber,
    versionToRevertToId,
    previousCommonBody,
    dimensions
}, sinkExchange) {

    const result = {

        'CLM_IMPL.IE_HUB': [{
            IE_NUMBER: number
        }],

        'CLM_IMPL.IE_SAT': [{
            IE_NUMBER: number,
            IE_DATE: body.eventDateInfo?.eventDate,
            YEAR_QUARTER: body.eventDateInfo?.yearQuarter,
            TYPE_CODE: body.insuredEventType?.code,
            TYPE_DESCRIPTION: body.insuredEventType?.description,
            REASON_CODE: body.insuredEventReason?.code,
            REASON_DESCRIPTION: body.insuredEventReason?.description,
            DIAGNOSIS_CODE: body.diagnosis?.code,
            DIAGNOSIS_DESCRIPTION: body.diagnosis?.description,
            DIAGNOSIS_NOTE: body.diagnosisNote,
            EXT_CONTRACT_NUMBER: body.contract?.externalNumber,
            IS_EXTERNAL_CONTRACT: body.contract?.isExternal ?? false,
            STATE: state,
            FIXED_EXCH_RATE: body.fixedExchangeRate,
            USE_FIXED_EXCH_RATE: body.useFixedExchangeRate ?? false
        }],

        'CLM_IMPL.IE_CONTRACT_LINK': body.contract?.number ? [{
            IE_NUMBER: number,
            CONTRACT_NUMBER: body.contract.number
        }] : [],

        'CLM_IMPL.IE_CONTRACT_SAT': body.contract?.number ? [{
            IE_NUMBER: number,
            CONTRACT_NUMBER: body.contract.number,
            IE_CONTRACT_CONF_NAME: body.contract.configurationName
        }] : []

    };

    return result;
};
