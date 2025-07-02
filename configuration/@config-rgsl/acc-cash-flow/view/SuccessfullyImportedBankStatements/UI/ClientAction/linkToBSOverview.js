module.exports = function linkToBSOverview(input) {
    const searchData = input.data.resultData;
    const searchRequest = {
        data: {
            criteria: {
                bankStatementItemId: searchData.bankStatementItemId,
            }
        },
        paging: {
            page: 0,
            pageSize: 5
        }
    };

    return {
        path: '/search',
        parametersData: {
            parameters: {
                entity: 'SearchView',
                configurationCodeName: 'BankStatementItemRgslView',
                version: 1
            },
            queryParameters: {
                searchRequest
            }
        }
    };
};
