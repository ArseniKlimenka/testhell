'use strict';
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function employeeNameOnSelected(input, ambientProperties) {

    const body = input.context.Body;

    if (!body.initiator) { body.initiator = {}; }

    body.initiator.employeeCode = input.getLookupSelection()[0].resultData.serviceProviderCode;

    if (body.initiator.employeeCode) {

        const userRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/UserDataSource',
            data: {
                data: {
                    criteria: {
                        employeeCode: body.initiator.employeeCode
                    }
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(userRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (result && result.data && result.data.length > 0) {
            const userData = result.data[0].resultData;

            body.initiator.userId = userData.userId;
            body.initiator.userName = userData.userName;
            body.initiator.partyCode = userData.partyCode;
            body.initiator.partyFullName = userData.partyFullName;
            body.initiator.employeeCode = userData.employeeCode;
            body.initiator.organisationUnitCode = userData.organisationUnitCode;
            body.initiator.organisationUnitName = userData.organisationUnitName;

            this.view.rebind();
            this.view.reevaluateRules();
            this.view.validate();
        }
    }

};
