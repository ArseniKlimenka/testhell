const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data?.length === 0) {
        return;
    }
    const reportDate = dateUtils.formatDate(sinkInput?.input?.data?.criteria?.reportDate, dateUtils.DateFormats.CALENDAR);

    sinkExchange.assets = sinkResult.data.map(_ => _.resultData);
    sinkExchange.assets.map(_ => _.reportDate = reportDate);
};
