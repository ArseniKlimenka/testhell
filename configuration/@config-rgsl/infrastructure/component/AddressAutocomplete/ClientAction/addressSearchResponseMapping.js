module.exports = function addressSearchResponseMapping(input) {
    let result = [];

    if (input && input.response && input.response.data && input.response.data.length > 0) {
        result = _.map(input.response.data, (elem) => {

            return elem.resultData;

        });
    }

    return result;
};
