const { showPreTranslatedError } = require('@config-system/infrastructure/lib/DialogHelper');

module.exports = async function savePerson(input, ambientProperties) {
    const data = input.context;

    const errors = this.view.validateAndGroupByPath();

    if (errors && errors.length > 0) {
        return;
    }

    const partyRequestData = prepareRequestData(data.Body.data);
    let request = {};

    const currentActor = input.context.WorkUnitActor.CurrentActor;
    const workUnitActorCode = currentActor == 'OrganisationAdministrator' ? 'OrganisationAdministrator' : 'PartyEditor';

    if (data.Body.IsSaved) {
        request = prepareUpdateRequest(data.Code, data.Body.ETag, workUnitActorCode, partyRequestData);
    }
    else {
        request = prepareCreateRequest(workUnitActorCode, partyRequestData);
    }

    await executeApiRequest(request, data, ambientProperties, this.view);

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

function handleResponse(response, body, ambientProperties) {
    body.IsSaved = true;
    body.ETag = response.headers.get('etag');
    body.Id = response.body.id;
    body.Code = response.body.Code;

    ambientProperties.services.util.raiseEvent('LEGAL_ENTITY_CREATED', body);
}

function prepareCreateRequest(workUnitActorCode, data) {
    return {
        method: 'POST',
        url: 'api/party/public/parties/LegalEntity/',
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
        url: `api/party/public/parties/LegalEntity/${partyCode}`,
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

    handleResponse(result, data.Body, ambientProperties);
    view.stopBlockingUI();

    // Pop up usage has "Close" and "Save" buttons to close the dialog, as select does not propagate data.
    if (data.viewContext.isPopUp) {
        data.dialogContext.outputContext.body = data.Body.data;
        data.dialogContext.closeDialog();
    }
}
