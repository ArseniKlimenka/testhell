module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        username: item.resultData.errors.username ? item.resultData.errors.username : '',
        errorMessage: item.resultData.errors.errorMessage ? item.resultData.errors.errorMessage : ''
    }));

    return result;
};
