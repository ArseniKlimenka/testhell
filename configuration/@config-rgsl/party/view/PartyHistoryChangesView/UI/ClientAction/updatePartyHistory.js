'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const printoutHelper = require('@config-rgsl/party/lib/partyTranslationHistoryHelper');

module.exports = async function updatePartyHistory(input, ambientProperties) {

    const partyId = input.rootContext?.Id;

    if (!partyId) {
        return;
    }

    const request = {
        method: 'POST',
        url: 'api/entity-infrastructure/shared/datasource/PartyHistoryChangesDataSource',
        data: {
            data: {
                criteria: {
                    partyId: partyId
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(request);
        input.context.Body.partyHistory = printoutHelper.historyMapping(result);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }
};
