module.exports = function basicAssetPropertiesResponseMapping(input) {

    let output = [];

    if (input.response?.data?.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.assetNumber.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '') ||
                    elem.idIsin.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output.sort((a, b) => (a.assetNumber > b.assetNumber) ? 1 : ((b.assetNumber > a.assetNumber) ? -1 : 0));

};
