const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function saveUser(input, ambientProperties) {
    const { data } = input;

    this.view.startBlockingUI();

    this.view.enableValidation();
    const errors = this.view.validateAndGroupByPath();

    let errorsCount = 0;
    errors.forEach(item => (
        errorsCount += item.errors.length + item.warnings.length
    ));

    if (errorsCount > 0) {
        this.view.expandSideContent();
        this.view.stopBlockingUI();
        throw 'При наличии ошибок сохранение невозможно!';
    }

    const user = data.Body.general;

    await migrateKeycloak(this, user, ambientProperties);
};

async function migrateKeycloak(self, user, ambientProperties) {
    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/ApplicationUserResetPasswordService/1',
        data: {
            data: {
                externalId: user.externalId,
                password: user.password,
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
