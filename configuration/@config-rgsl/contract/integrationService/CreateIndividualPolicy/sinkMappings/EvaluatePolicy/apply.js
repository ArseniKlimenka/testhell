'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {
    sinkExchange.mapContext('body', sinkResult.body);

    const validationErrors = sinkResult.validationResult.schemaValidations?.map(e => ({
        code: e.code,
        message: e.message,
        dataPath: e.reference.dataPath
    }));

    sinkExchange.mapContext('validationErrors', validationErrors);
};
