'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const body = sinkExchange.body;

    const docTypeCode = body.insuredPersonData?.docTypeCode;

    if (docTypeCode && !input.isContractEnrichOnly && !sinkExchange.isDuplicate) {

        return {
            input: {
                data: {
                    criteria: {
                        documentTypeCode: docTypeCode
                    }
                }
            }
        };
    }
};
