'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const code = sinkExchange.body?.contract?.type?.code;
    if (code) {

        return {
            input: {
                data: {
                    criteria: {
                        code
                    }
                }
            }
        };
    }
};
