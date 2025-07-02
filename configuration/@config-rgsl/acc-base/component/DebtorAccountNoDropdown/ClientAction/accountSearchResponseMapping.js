module.exports = function accountSearchResponseMapping(input) {

    return input?.response?.data?.map(elem => elem.resultData.accountNo);
};
