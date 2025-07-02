module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    this.applicationContext.locale = "ru-RU";

    if (sinkResult.validationResult &&
        sinkResult.validationResult.schemaValidations &&
        sinkResult.validationResult.schemaValidations.length > 0) {
        sinkExchange.hasValidationErrors = true;
        sinkExchange.validationErrors = sinkResult.validationResult.schemaValidations;
    }

    sinkExchange.partyCode = sinkResult.code;
    sinkExchange.partyId = sinkResult.id;

};
