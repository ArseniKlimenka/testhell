const { showPreTranslatedError } = require("@config-system/infrastructure/lib/DialogHelper");

/**
 * @translationKey {translationKey} PartyHasAnotherUser
 * @translationKey {translationKey} PartyHasNoEmployee
 */

module.exports = async function partyResultMapping(input, ambientProperties) {

    const { getLookupSelection, data, rootContext } = input;
    const lookupSelection = getLookupSelection();

    if (lookupSelection[0] && lookupSelection[0].resultData) {

        const selected = lookupSelection[0];

        const partyHasAnotherUser = await checkIfCanUseParty(selected.metadata.code, this.view.customParameters.userId, data.claims, rootContext, ambientProperties);
        if (partyHasAnotherUser) { return; }
        const partyHasNoEmployee = await checkIfPartyHasEmployee(selected.metadata.code, rootContext, ambientProperties);
        if (partyHasNoEmployee) { return; }

        data.claims.PartyCode = selected.metadata.code;
        data.claims.DisplayName = selected.resultData.fullName;

    }

};

async function checkIfCanUseParty(partyCode, applicationUserId, claims, rootContext, ambientProperties) {

    const request = {
        method: "POST",
        url: `api/entity-infrastructure/shared/datasource/CanCreateUserForPartyDataSource`,
        data: {
            data: {
                partyCode: partyCode,
                applicationUserId: applicationUserId
            }
        }
    };

    return ambientProperties.services.api
        .call(request)
        .then(result => {
            if (!result.data) {
                const translatedMessage = ambientProperties.services.translate.getSync(rootContext.ConfigurationCodeName, 'PartyHasAnotherUser');
                showPreTranslatedError(ambientProperties, translatedMessage);
                return true;
            }
            return false;
        });

}

async function checkIfPartyHasEmployee(partyCode, rootContext, ambientProperties) {

    const request = {
        method: "POST",
        url: `api/entity-infrastructure/shared/datasource/ServiceProviderDataSource`,
        data: {
            data: {
                criteria: {
                    partyCode: partyCode,
                    serviceProviderType: "Employee"
                }
            }
        }
    };

    return ambientProperties.services.api
        .call(request)
        .then(result => {
            if (!result.data || result.data.length == 0) {
                const translatedMessage = ambientProperties.services.translate.getSync(rootContext.ConfigurationCodeName, 'PartyHasNoEmployee');
                showPreTranslatedError(ambientProperties, translatedMessage);
                return true;
            }
            return false;
        });

}
