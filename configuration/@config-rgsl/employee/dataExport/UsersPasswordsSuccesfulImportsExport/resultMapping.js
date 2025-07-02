module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        username: item.resultData.resultSummary.username ? item.resultData.resultSummary.username : '',
        sendEmail: item.resultData.resultSummary.sendEmail ? 'Да' : 'Нет',
        password: item.resultData.resultSummary.password || '',
        email: item.resultData.resultSummary.email || ''
    }));

    return result;
};
