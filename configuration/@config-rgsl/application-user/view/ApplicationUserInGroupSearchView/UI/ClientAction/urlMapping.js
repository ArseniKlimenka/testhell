module.exports = function urlMapping(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: 'CustomView',
                configurationCodeName: 'ApplicationUserViewKeycloak',
                version: 1,
                userId: data.resultData.userId
            }
        }
    };
};
