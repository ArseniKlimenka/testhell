const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} PasswordHasBeenChanged
 */

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

    const user = data.Body;
    const claims = {};

    for (const claimType in user.general.claims) {
        if (claimHasValue(user.general.claims[claimType])) {
            claims[claimType] = user.general.claims[claimType].toString();
        }
    }

    const userData = {
        Username: user.general.username,
        Claims: claims,
        Password: user.general.password,
        LoginType: user.general.loginType,
        UserGroups: user.groups.map(group => {
            return {
                UserGroupId: group.id,
                UserGroupCode: group.code,
                IsGroupManager: group.isGroupManager,
                SubstituteUserId: group.substituteUserId
            };
        }),
        UserRoles: user.roles.filter(role => !role.isAssignedFromGroup).map(role => {
            return role.id;
        })
    };

    const handleSaveResponse = function (response, view) {
        view.setClean();
        ambientProperties.services.navigation.navigate('/edit', {
            parameters:
            {
                entity: 'CustomView',
                configurationCodeName: 'ApplicationUserViewKeycloak',
                version: 1,
                userId: response.UserId
            }
        });
        view.stopBlockingUI();
    };

    const saveRequest = {
        method: undefined,
        url: 'api/organisation/public/user-management/',
        data: userData,
        returnHttpPromise: true
    };

    if (user.general.isNewUser) {
        saveRequest.method = 'post';
    } else {
        saveRequest.method = 'put';
        userData.userId = this.view.customParameters.userId;
    }

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(saveRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (user.general.isNewUser) {
        user.general.isNewUser = false;
        this.view.customParameters.userId = result.UserId;
    }

    await migrateKeycloak(this, user.general, ambientProperties);

    if (user.general.isNewUser) {
        handleSaveResponse(result, this.view);
    } else if (user.general.password) {
        user.general.password = undefined;
        user.general.confirmPassword = undefined;
        await ambientProperties.services.confirmationDialog.show(ambientProperties.configurationCodeName.toUpperCase() + '.PasswordHasBeenChanged', 'OK', 'OK', 2);
    }
};

function claimHasValue(claim) {
    return claim != null && claim !== '';
}

async function migrateKeycloak(self, user, ambientProperties) {
    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/ApplicationUserMigrationService/1',
        data: {
            data: {
                username: user.username,
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

    const externalUserId = result.data.externalUserId;
    if (externalUserId && ambientProperties.applicationContext.isCurrentUserAdmin()) {
        user.editUrl = ambientProperties.services.identityProvider.getAdminEditAccountUrl(externalUserId);
    }
}
