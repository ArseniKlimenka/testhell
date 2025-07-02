'use strict';

module.exports = async function initiatorOnSelected(input, ambientProperties) {

    const lookupSelection = input.getLookupSelection();

    if (!lookupSelection[0]?.resultData) {

        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
        return;
    }

    const selected = lookupSelection[0].resultData;

    input.context.Body.initiator = {};
    input.context.Body.initiator.partyFullName = selected.partyDisplayName;
    input.context.Body.initiator.partyCode = selected.partyCode;
    input.context.Body.initiator.employeeCode = selected.serviceProviderCode;
    input.context.Body.initiator.organisationUnitCode = selected.orgUnitCode;
    input.context.Body.initiator.organisationUnitName = selected.orgUnitName;

    if (selected.serviceProviderCode) {

        const userRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/UserDataSource',
            data: {
                data: {
                    criteria: {
                        employeeCode: selected.serviceProviderCode
                    }
                }
            }
        };

        const result = await ambientProperties.services.api.call(userRequest);
        if (result?.data?.length > 0) {

            const userData = result.data[0].resultData;
            input.context.Body.initiator.userId = userData.userId;
            input.context.Body.initiator.userName = userData.userName;
        }
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
