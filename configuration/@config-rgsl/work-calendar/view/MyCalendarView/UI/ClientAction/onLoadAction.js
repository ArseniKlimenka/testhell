'use strict';

const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadAction(input, ambientProperties) {
    // Load calendar for current user:
    await loadWorkCalendarForCurrentUser(input.context, ambientProperties.applicationContext.currentUser(), ambientProperties, this.view);

    // Load substitutes for current user:
    loadSubstitutesForCurrentUser(input.context, ambientProperties.applicationContext.currentUser());

    // Enable showing validation results:
    this.view.validate();

    this.view.rebind();
    this.view.reevaluateRules();
};

async function loadWorkCalendarForCurrentUser(context, user, ambientProperties, view) {
    // Prepare request for obtaining availability for the calendar on the specified month:
    const getUserCalendarRequest = {
        method: 'GET',
        url: `api/organisation/public/work-calendars/user/${user.getUserId()}`,
        returnFullResponse: true
    };

    // Call API:
    let result;
    try {
        view.startBlockingUI();
        result = await ambientProperties.services.api.call(getUserCalendarRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }

    if (result && result.body && result.body.Code) {
        // Load existing calendar for current user:
        context.Body.workCalendar.Code = result.body.Code;
        context.Body.workCalendar.Body = result.body.Data.body;
        context.Body.workCalendar.Id = result.body.id;
        context.Body.workCalendar.IsSaved = true;
        context.Body.workCalendar.ETag = result.headers.get('etag');
        context.ParentId = result.body.ParentId;

        await workCalendarUtils.fillRulesWithBaseCalendarRules(context.Body.workCalendar.Body, ambientProperties.services.api);

        // Refresh calendar overview:
        view.refreshCalendarOverviewRules();
    } else {
        // Initialize new calendar for current user:
        context.Body.workCalendar.Body.applicationUserId = user.getUserId();
        const calendarTranslation = ambientProperties.services.translate.getSync('CLIENT_BUSINESS_ORGANISATION', '##CALENDAR');
        context.Body.workCalendar.Body.name = `${user.getClaims().DisplayName} ${calendarTranslation}`;
        context.Body.workCalendar.IsSaved = false;
    }

    // Ensure that controls are showing the valid data:
    view.rebind();
    view.reevaluateRules();
}

function loadSubstitutesForCurrentUser(context, user) {
    context.Body.userGroups = user.getUserGroups()
        .map((userGroup) => {
            return {
                substituteUserDisplayName: userGroup.SubstituteUserDisplayName ? userGroup.SubstituteUserDisplayName : undefined,
                substituteUserId: userGroup.SubstituteUserId ? userGroup.SubstituteUserId : undefined,
                userGroupCode: userGroup.UserGroupCode,
                userGroupId: userGroup.UserGroupId,
                userGroupName: userGroup.UserGroupName
            };
        });
}
