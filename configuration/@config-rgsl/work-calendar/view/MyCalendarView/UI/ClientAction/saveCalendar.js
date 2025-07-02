'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function saveCalendar(input, ambientProperties) {
    const data = input.context;

    this.view.enableValidation();
    const errors = this.view.validateAndGroupByPath();

    if (errors && errors.length > 0) {
        this.view.expandSideContent();
        return;
    }

    let request = {};

    if (data.Body.workCalendar.IsSaved) {
        request = prepareUpdateRequest(data);
    }
    else {
        request = prepareCreateRequest(data);
    }

    await executeApiRequest(request, data, ambientProperties, this.view);
};

function handleResponse(response, data) {
    data.Body.workCalendar.IsSaved = true;
    data.Body.workCalendar.ETag = response.headers.get('etag');
    data.Body.workCalendar.Id = response.body.id;
    data.Body.workCalendar.Code = response.body.Code;
}

function prepareCreateRequest(data) {
    return {
        method: 'POST',
        url: 'api/organisation/public/work-calendars/',
        data: {
            Data: data.Body.workCalendar.Body,
            ParentId: data.ParentId,
        },
        callContext: {
            workUnitActorCode: data.CurrentActor
        },
        returnFullResponse: true
    };
}

function prepareUpdateRequest(data) {
    return {
        method: 'PUT',
        url: `api/organisation/public/work-calendars/${data.Body.workCalendar.Code}`,
        data: {
            Data: data.Body.workCalendar.Body,
            ParentId: data.ParentId,
        },
        headers: {
            'If-Match': data.Body.workCalendar.ETag
        },
        callContext: {
            workUnitActorCode: data.CurrentActor
        },
        returnFullResponse: true
    };
}

async function executeApiRequest(request, data, ambientProperties, view) {

    let result;
    try {
        view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }

    handleResponse(result, data);

    // Refresh calendar overview:
    view.refreshCalendarOverviewRules();
}
