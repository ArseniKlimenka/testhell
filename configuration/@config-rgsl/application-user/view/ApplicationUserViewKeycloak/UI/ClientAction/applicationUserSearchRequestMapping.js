module.exports = function applicationUserSearchRequestMapping(input) {
    const request = {
        data: {
            criteria: {
                [input.searchFieldName]: input.searchText || input.refPropertyValue
            },
            sort: [
                {
                    fieldName: input.searchFieldName,
                    descending: false
                }
            ]
        },
        paging: {
            pageSize: this.getMaxItems(),
            page: 0
        }
    };

    return request;
};
