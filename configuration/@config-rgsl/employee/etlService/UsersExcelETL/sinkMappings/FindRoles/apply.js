module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length === 0) { return; }

    const roles = {};

    sinkResult.data.forEach(element => {
        roles[element.resultData.code] = element.resultData.id;
    });

    sinkExchange.roles = roles;
};
