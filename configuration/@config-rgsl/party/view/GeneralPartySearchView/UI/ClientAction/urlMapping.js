module.exports = function urlMapping(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "Party",
                configurationCodeName: data.metadata.configurationName,
                version: "1",
                code: data.metadata.code
            }
        }
    };
};
