'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { additionalInitiatorType } = require('@config-rgsl/life-insurance/lib/additionalInitiatorsHelper');

module.exports = async function agentOnSelected(input, ambientProperties) {

    let isUserActive = true;
    input.rowContext.agent.employeeCode = input.getLookupSelection()[0].resultData.serviceProviderCode;

    if (input.rowContext.agent.employeeCode) {

        const userActiveRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/UserActiveDataSource',
            data: {
                data: {
                    criteria: {
                        employeeCode: input.rowContext.agent.employeeCode
                    }
                }
            }
        };

        let userActiveResult;
        try {
            userActiveResult = await ambientProperties.services.api.call(userActiveRequest);
        }
        catch (err) {
            throwResponseError(err);
        }

        if (userActiveResult && userActiveResult.data && userActiveResult.data.length > 0) {
            const userData = userActiveResult.data[0].resultData;

            if (!userData.isUserActive) {
                isUserActive = false;
                ambientProperties.services.confirmationDialog.showNotification('Только активный пользователь может быть инициатором.', 'OK', 'Cancel', 1);
            }

        }

        if (isUserActive) {
            const userRequest = {
                method: 'post',
                url: 'api/entity-infrastructure/shared/datasource/UserDataSource',
                data: {
                    data: {
                        criteria: {
                            employeeCode: input.rowContext.agent.employeeCode
                        }
                    }
                }
            };

            let userResult;
            try {
                userResult = await ambientProperties.services.api.call(userRequest);
            }
            catch (err) {
                throwResponseError(err);
            }

            if (userResult && userResult.data && userResult.data.length > 0) {
                const userData = userResult.data[0].resultData;

                input.rowContext.agent.userId = userData.userId;
                input.rowContext.agent.userName = userData.userName;
                input.rowContext.agent.partyCode = userData.partyCode;
                input.rowContext.agent.partyFullName = userData.partyFullName;
                input.rowContext.agent.employeeCode = userData.employeeCode;
                input.rowContext.agent.organisationUnitCode = userData.organisationUnitCode;
                input.rowContext.agent.organisationUnitName = userData.organisationUnitName;
                input.rowContext.agent.sadNumber = userData.sadNumber;

                const mainOrSplitShare = input.componentContext.additionalInitiatorsLines?.filter(item => item.agentType === additionalInitiatorType.Main || item.agentType === additionalInitiatorType.Split);
                if (mainOrSplitShare?.length > 0) {
                    input.rowContext.agentShare = 100 - mainOrSplitShare[0].agentShare;
                }

                if (input.rowContext.agentType === undefined || input.rowContext.agentType === additionalInitiatorType.Mage) {
                    input.rowContext.agentShare = "0";
                }

                this.view.rebind();
                this.view.reevaluateRules();
                this.view.validate();
            }
        }
    }
};
