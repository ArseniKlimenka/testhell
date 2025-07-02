const { DateTimeFormatter, ZonedDateTime, ZoneOffset } = require('@js-joda/core');

module.exports = function mapping(errorLineInput, sinkExchange) {

    const executedOn = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.n'));
    const errorInfo = errorLineInput.businessErrors != undefined && errorLineInput.businessErrors.length > 0 ?
        errorLineInput.businessErrors[0] :
        {};

    const record = {
        EXECUTED_ON: executedOn,
        CONTRACT_NUMBER: errorLineInput.sink.mappingResult?.businessNumber,
        ERROR_MESSAGE: errorLineInput.message,
        ERROR_CODE: errorInfo?.code,
        ERROR_MESSAGE_DESCRIPTION: errorInfo?.message
    };

    return {
        'BFX_IMPL.AUTOCONVERSION_LOG': [record]
    };
};
