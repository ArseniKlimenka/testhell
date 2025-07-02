'use strict';
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onBeforeSaveDocumentAction(input, ambientProperties) {

    const codes = input.context.Body?.partyCodes?.replace(/\s+/g, '')?.split(",")?.filter(Boolean);

    if (!codes || codes.length === 0) {
        return;
    }

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PartyCodeDataSource',
        data: {
            data: {
                criteria: {
                    partyCodes: codes
                }
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    input.context.Body.foundCodes = (result.data.map(_ => _.resultData.partyCode)).join();
    input.context.Body.notFoundCodes = (codes.filter(_ => !input.context.Body.foundCodes.includes(_))).join();

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
