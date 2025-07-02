module.exports = function applicationUserSearchResponseMapping(input) {
    let ret = [];

    if (input && input.response && input.response.data && input.response.data.length > 0) {
        ret = input.response.data.map(elem => elem.resultData);
    }

    return ret;
};
