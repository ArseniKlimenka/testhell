module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        username: item.resultData.resultSummary.username ?? '',
        password: item.resultData.resultSummary.password ?? ''
    }));

    return result;
};
