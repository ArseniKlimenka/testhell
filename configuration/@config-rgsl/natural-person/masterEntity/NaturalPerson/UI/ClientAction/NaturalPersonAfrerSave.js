'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { checkContractors } = require('@config-rgsl/party/lib/naturalPersonHelper');

module.exports = async function NaturalPersonAfrerSave(input, ambientProperties) {

    if (input.rootContext.ClientViewModel.isCheckKpkAfterSave) {

        await checkContractors(input, ambientProperties, this.view);
        input.rootContext.ClientViewModel.isCheckKpkAfterSave = false;
    }

    if (input.rootContext.ClientViewModel.isNotificationNeedToSend) {

        this.view.startBlockingUI();

        try {
            const userId = ambientProperties.applicationContext.currentUser().getUserId();
            sendNotification(input, userId, ambientProperties);
            input.rootContext.ClientViewModel.isNotificationNeedToSend = false;
        } catch (err) {
            throwResponseError(err);
        } finally {
            this.view.stopBlockingUI();
        }
    }
};

async function sendNotification(input, currentUserId, ambientProperties) {

    const partyPersonData = input.context.Body?.partyPersonData;
    const partyFullName = `${partyPersonData?.lastName ?? ''} ${partyPersonData?.firstName ?? ''} ${partyPersonData?.middleName ?? ''}`;

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/ComplianceInternalNotificationIntegrationService/1',
        data: {
            data: {
                userId: currentUserId,
                cardCode: input.context.Code,
                partyFullName: partyFullName
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
}
