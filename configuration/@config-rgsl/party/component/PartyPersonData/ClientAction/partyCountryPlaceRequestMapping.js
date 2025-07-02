module.exports = function partyCountryPlaceRequestMapping(input) {

    return {
        data: {
            criteria: {
                countrySearchText: input.searchText,
                withoutObsolete: false
            }
        }
    };

};
