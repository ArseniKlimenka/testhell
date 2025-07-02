const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoad(input, ambientProperties) {
    const { context } = input;

    const allowedActors = context.WorkUnitActor.AllowedActors;
    if (allowedActors.some(item => item == 'OrganisationAdministrator')) {
        context.WorkUnitActor.CurrentActor = 'OrganisationAdministrator';
        this.view.validate();
    }

    if (!context.viewContext) {
        context.viewContext = {};
    }

    const customData = this.view.getCustomData();

    if (customData) {
        if (customData.editPartyCode) {
            context.viewContext.editPartyCode = customData.editPartyCode;
        }

        if (customData.isPopUp) {
            context.viewContext.isPopUp = true;
        }
    }

    if (context.viewContext.editPartyCode) {

        const getRequest = prepareGetRequest(context.viewContext.editPartyCode, context.CurrentActor);

        await executeApiRequest(getRequest, context.Body, ambientProperties, this.view);
    }

    context.Body.data.partyRoleOfPerson.partyRole = "/policyHolderLegalEntity";
    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

/**
 * Raise event which enables the "Select" button, without needing to save without changes.
 * @param {Object} data - Party data.
 * @param {Object} ambientProperties - Client action ambientProperties.
 */
function raisePartyLoadedEvent(data, ambientProperties) {
    const eventArgs = {
        sender: {
            elementId: 'legalEntityBasicEdit'
        },
        parameters: {
            data: data
        }
    };

    ambientProperties.services.util.raiseEvent('LEGAL_ENTITY_CREATED', eventArgs);
}

function prepareGetRequest(partyCode, workUnitActorCode) {
    return {
        method: 'GET',
        url: `api/party/public/parties/LegalEntity/${partyCode}`,
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
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }

    handleResponse(result, data);
    raisePartyLoadedEvent(data, ambientProperties);
}

function handleResponse(response, body) {
    body.data = response.body.Data.body;

    body.IsSaved = true;
    body.ETag = response.headers.get('etag');
    body.Id = response.body.id;
    body.Code = response.body.Code;

    // Load relevant data:
    // data.Body.shortName = body.legalEntityData.shortName;
    // data.Body.legalName = body.legalEntityData.legalName;

    // data.Body.taxnumber = body.commonData.taxnumber;
    // data.Body.nationalIdentifier = body.commonData.nationalIdentifier;
    // copyPropertiesFromObjectToObject(data.Body.address, body.commonData.residenceAddress);
}

function copyPropertiesFromObjectToObject(target, source) {
    if (!source) {
        return;
    }

    Object.keys(source).forEach(key => {
        target[key] = source[key];
    });
}
