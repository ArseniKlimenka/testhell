'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {
    return {
        recipient: sinkExchange.recipient,
        insuredPerson: sinkExchange.insuredPerson
    };

};
