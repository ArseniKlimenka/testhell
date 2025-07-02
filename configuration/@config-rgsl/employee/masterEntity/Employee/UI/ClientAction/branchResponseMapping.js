module.exports = function branchResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.branchName.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output
        .sort((a, b) => (a.branchName > b.branchName) ? 1 : ((b.branchName > a.branchName) ? -1 : 0));

};
