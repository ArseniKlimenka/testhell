module.exports = function urlMapping(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "ApplicationUserGroup",
                configurationCodeName: "ApplicationUserGroup",
                code: data.resultData.code
            }
        }
    };
};
