'use strict';

module.exports = function (sinkInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    actNo: sinkInput.actNumber,
                }
            }
        }
    };
};
