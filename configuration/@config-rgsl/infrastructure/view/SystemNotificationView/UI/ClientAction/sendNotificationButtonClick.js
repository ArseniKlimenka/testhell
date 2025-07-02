module.exports = async function sendNotificationButtonClick(input, ambientProperties) {

    const notificationMessage = input.context.request.data.notificationMessage;
    if (!notificationMessage) {

        await ambientProperties.services.confirmationDialog.showWarning('Не заполнен текст уведомления!', "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 1);

        return;
    }

    await ambientProperties.services.confirmationDialog.showWarning(`Отправить системное уведомление со следующим сообщением: ${notificationMessage}?`, "UI_BOOTSTRAP.##OK", "UI_BOOTSTRAP.##CANCEL", 3)
        .then(async isOk => {
            if (isOk) {
                const request = {
                    method: 'post',
                    url: 'api/core/notifications/SystemNotification/1',
                    data: {
                        dataContext: {
                            notification: notificationMessage
                        }
                    },
                    throwException: true
                };

                await sendNotification(request, ambientProperties);

                input.context.request.data.notificationMessage = '';

                this.view.search();
            }

            return;
        });
};

async function sendNotification(request, ambientProperties) {
    await ambientProperties.services.api.call(request)
        .then((result) => {

            return;
        })
        .catch(error => {
            console.log(error);
            ambientProperties.services.confirmationDialog.showError(error);
        });
}
