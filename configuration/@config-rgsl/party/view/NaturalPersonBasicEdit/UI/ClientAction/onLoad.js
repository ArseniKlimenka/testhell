'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { beneficiaryOwnerCode } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function onLoad(input, ambientProperties) {

    const { context } = input;

    setPartyRoleBeneficiaryOwner(context, this);

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

        executeApiRequest(getRequest, context, ambientProperties, this.view);
    }

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
            elementId: 'naturalPersonBasicEdit'
        },
        parameters: {
            data: data
        }
    };

    ambientProperties.services.util.raiseEvent('NATURAL_PERSON_CREATED', eventArgs);
}

function prepareGetRequest(partyCode, workUnitActorCode) {
    return {
        method: 'GET',
        url: `api/party/public/parties/NaturalPerson/${partyCode}`,
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

    handleResponse(result, data.Body);
    raisePartyLoadedEvent(data, ambientProperties);
}

function handleResponse(response, body) {
    body.data = response.body.Data.body;

    body.IsSaved = true;
    body.ETag = response.headers.get('etag');
    body.Id = response.body.id;
    body.Code = response.body.Code;

}

function setPartyRoleBeneficiaryOwner(context, currentContext) {

    const documentContext = currentContext?.view?.getParentView()?.getParentView()?.getContext();
    const currentBeneficiaryOwnerCode = documentContext?.Body?.data?.partyGeneralData?.beneficiaryOwner?.beneficiaryOwnerCode;
    const isOtherNaturalPerson = currentBeneficiaryOwnerCode == beneficiaryOwnerCode.OtherNaturalPerson;
    const configurationCodeName = documentContext?.ConfigurationCodeName;
    const isLegalEntity = configurationCodeName == 'LegalEntity';

    if (isLegalEntity && isOtherNaturalPerson) {
        context.Body.data.partyRoleOfPerson.partyRole = '/beneficiaryOwner';
    }
}
