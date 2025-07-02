'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult && sinkResult.data && sinkResult.data.length && sinkResult.data.length > 0) {

        const requestOnReviewStateHistory = sinkResult.data.filter((item) => {
            if (item.resultData.state == 'На рассмотрении СК') {
                return item;
            }
        }).map(item => item.resultData);

        if (requestOnReviewStateHistory.length > 0) {
            sinkExchange.onReviewRequestLastDate = dateUtils.parseToLocalDate(requestOnReviewStateHistory[0].validFrom);
            sinkExchange.onReviewRequestFirstDate = dateUtils.parseToLocalDate(requestOnReviewStateHistory[requestOnReviewStateHistory.length - 1].validFrom);
        }

    }

};
