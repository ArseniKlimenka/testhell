'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = async function workCalendarLookupResultMapping(input, ambientProperties) {
    const { getLookupSelection, context } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        if (selected.metadata && selected.metadata.entityId) {
            input.data[input.dataProperty] = selected.resultData.code;
        } else {
            input.data[input.dataProperty] = undefined;
        }

        if (input.data[input.dataProperty]) {
            await fillDataWithParentCalendarData(context, input.data, ambientProperties.services.api);
        } else {
            clearParentCalendarData(context, input.data);
        }
    }
};

async function fillDataWithParentCalendarData(context, resolvedData, api) {
    await workCalendarUtils.fillRulesWithBaseCalendarRules(resolvedData, api);

    const request = {
        method: 'GET',
        url: `api/organisation/public/work-calendars/${resolvedData.parentCalendarCode}`,
        throwException: true
    };
    const result = await api.call(request);
    resolvedData.parentCalendarName = result.Data.body.name;
    context.ParentId = result.id;
}

function clearParentCalendarData(context, resolvedData) {
    resolvedData.rules.splice(0, resolvedData.rules.length, ...resolvedData.rules.filter(r => !r.sourceCalendarCode));

    resolvedData.parentCalendarName = undefined;
    context.ParentId = undefined;
}
