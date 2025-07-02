const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function deleteNotificationButtonClick(input, ambientProperties) {

    const selection = getValue(input, 'context.selection', []);

    if (selection.length == 0) {

        await ambientProperties.services.confirmationDialog.showWarning('Не выбрано уведомление для удаления!', "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 1);

        return;
    }

    const isOk = await ambientProperties.services.confirmationDialog.showWarning(`Удалить системное уведомление со следующим сообщением: ${selection[0].resultData.subject}?`, "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 3);
    if (isOk) {
        await deleteBannerNotification(this, selection[0].resultData, ambientProperties);
        this.view.search();
    }
};

async function deleteBannerNotification(self, input, ambientProperties) {

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/DeleteBannerNotificationIS/1`,
        data: {
            data: {
                notificationId: input.notificationId,
                requestingUserId: input.userId
            }
        }
    };

    let result;
    try {
        self.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        self.view.stopBlockingUI();
    }
}
