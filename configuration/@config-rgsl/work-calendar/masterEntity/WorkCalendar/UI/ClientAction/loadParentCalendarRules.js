const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

module.exports = async function loadParentCalendarRules(input, ambientProperties) {
    await workCalendarUtils.fillRulesWithBaseCalendarRules(input.context.Body, ambientProperties.services.api);
};
