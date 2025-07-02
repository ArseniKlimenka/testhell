'use strict';

module.exports = function urlMappingParentCalendar(input) {

    const { data } = input;

    return {
        path: '/edit',
        parametersData: {
            parameters: {
                entity: "WorkCalendar",
                configurationCodeName: data.metadata.configurationName,
                code: data.resultData.parentCalendarCode
            }
        }
    };
};
