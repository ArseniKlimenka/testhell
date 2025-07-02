module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    return {
        workCalendar: sinkExchange.workCalendar
    };
};
