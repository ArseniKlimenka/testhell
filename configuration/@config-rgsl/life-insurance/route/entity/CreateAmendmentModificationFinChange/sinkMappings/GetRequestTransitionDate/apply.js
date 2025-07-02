const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult?.data?.length > 0) {
        sinkExchange.receivedDate = DateTimeUtils.formatDate(sinkResult.data.filter(item => item.resultData.transition == 'OnReview_to_Issued')[0]?.resultData?.validFrom);
    }

};
