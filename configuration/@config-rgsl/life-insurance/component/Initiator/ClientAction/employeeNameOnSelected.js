'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function employeeNameOnSelected(input, ambientProperties) {

    let isUserActive = true;

    input.componentContext.employeeCode = input.getLookupSelection()[0].resultData.serviceProviderCode;

    if (input.componentContext.employeeCode) {

        const userActiveRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/UserActiveDataSource',
            data: {
                data: {
                    criteria: {
                        employeeCode: input.componentContext.employeeCode
                    }
                }
            }
        };

        let userActiveResult;
        try {
            this.view.startBlockingUI();
            userActiveResult = await ambientProperties.services.api.call(userActiveRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (userActiveResult && userActiveResult.data && userActiveResult.data.length > 0) {
            const userData = userActiveResult.data[0].resultData;

            if (!userData.isUserActive) {
                isUserActive = false;
                // let userLink = `<a href="/edit;entity=CustomView;configurationCodeName=ApplicationUserViewKeycloak;version=1;userId=${userData.applicationUserId}">${userData.partyFullName}</a>`;
                // let userLinkWithMessage = `<br>Пользователь: ${userLink}.`;
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
                            employeeCode: input.componentContext.employeeCode,
                        }
                    }
                }
            };

            let userResult;
            try {
                this.view.startBlockingUI();
                userResult = await ambientProperties.services.api.call(userRequest);
            }
            catch (err) {
                throwResponseError(err);
            }
            finally {
                this.view.stopBlockingUI();
            }

            if (userResult && userResult.data && userResult.data.length > 0) {
                const userData = userResult.data[0].resultData;

                input.componentContext.userId = userData.userId;
                input.componentContext.userName = userData.userName;
                input.componentContext.partyCode = userData.partyCode;
                input.componentContext.partyFullName = userData.partyFullName;
                input.componentContext.employeeCode = userData.employeeCode;
                input.componentContext.organisationUnitCode = userData.organisationUnitCode;
                input.componentContext.organisationUnitName = userData.organisationUnitName;
                input.componentContext.sadNumber = userData.sadNumber;

                this.view.rebind();
                this.view.reevaluateRules();
                this.view.validate();
            }
        }
    }
};
