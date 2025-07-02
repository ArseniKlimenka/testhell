'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const certificateBody = sinkExchange.createdDocument.Body;
    const certificateId = sinkExchange.createdDocument.Id;
    const certificateNumber = sinkExchange.createdDocument.Number;

    return {
        Id: certificateId,
        Number: certificateNumber,
        certificateBody
    };
};
