const { showPreTranslatedError } = require('@config-system/infrastructure/lib/DialogHelper');

module.exports = async function savePerson(input, ambientProperties) {
    const body = input.context.Body;

    const errors = this.view.validateAndGroupByPath();

    if (errors && errors.length > 0) {
        return;
    }

    const partyRequestData = prepareRequestData(body.data);
    let request = {};

    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const workUnitActorCode = currentActor == 'OrganisationAdministrator' ? 'OrganisationAdministrator' : 'PartyEditor';

    if (body.IsSaved) {
        request = prepareUpdateRequest(body.Code, body.ETag, workUnitActorCode, partyRequestData);
    }
    else {
        request = prepareCreateRequest(workUnitActorCode, partyRequestData);
    }

    await executeApiRequest(request, body, ambientProperties, this.view);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

function prepareRequestData(data) {
    return {
        'data': data,
        'enrichFields': [
            '/*'
        ]
    };
}

function handleResponse(response, data, ambientProperties) {
    data.IsSaved = true;
    data.ETag = response.headers.get('etag');
    data.Id = response.body.id;
    data.Code = response.body.Code;

    ambientProperties.services.util.raiseEvent('NATURAL_PERSON_CREATED', data);
}

function prepareCreateRequest(workUnitActorCode, data) {
    return {
        method: 'POST',
        url: 'api/party/public/parties/NaturalPerson/',
        data,
        callContext: {
            workUnitActorCode: workUnitActorCode
        },
        returnFullResponse: true
    };
}

function prepareUpdateRequest(partyCode, eTag, workUnitActorCode, data) {
    return {
        method: 'PUT',
        url: `api/party/public/parties/NaturalPerson/${partyCode}`,
        data,
        headers: {
            'If-Match': eTag
        },
        callContext: {
            workUnitActorCode: workUnitActorCode
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
        showPreTranslatedError(ambientProperties, err);
        return;
    }
    finally {
        view.stopBlockingUI();
    }

    handleResponse(result, data, ambientProperties);

    // Pop up usage has "Close" and "Save" buttons to close the dialog, as select does not propagate data.
    if (data.viewContext?.isPopUp) {
        data.dialogContext.outputContext.body = data.data;
        data.dialogContext.closeDialog();
    }
}
