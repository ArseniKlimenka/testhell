module.exports = function addressSearchRequestMapping(input) {

    const searchText = input?.searchText;
    const fullAddressValue = input?.context?.fullAddress?.value;

    if (searchText || fullAddressValue) {
        return {
            data: {
                criteria: {
                    query: searchText || fullAddressValue
                }
            }
        };
    }

};
