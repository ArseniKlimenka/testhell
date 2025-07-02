'use strict';

module.exports = function urlMappingCalendar(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "WorkCalendar",
                configurationCodeName: data.metadata.configurationName,
                code: data.resultData.code
            }
        }
    };
};
