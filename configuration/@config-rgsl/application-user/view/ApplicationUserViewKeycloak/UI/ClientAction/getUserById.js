const { showPreTranslatedError } = require('@config-system/infrastructure/lib/DialogHelper');

module.exports = async function getUserById(input, ambientProperties) {
    const body = input.context.Body;
    body.general.allowEdit = true;

    if (this.customParameters && this.customParameters.userId) {

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/GetApplicationUserDataSource',
            data: {
                data: {
                    userId: this.customParameters.userId
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            showPreTranslatedError(ambientProperties, err);
            return;
        }
        finally {
            this.view.stopBlockingUI();
        }

        const user = result.data;
        body.general.isNewUser = false;
        body.general.username = user.Username;
        body.general.loginType = user.LoginType;

        if (user.ExternalId) {
            body.general.editUrl = ambientProperties.services.identityProvider.getAdminEditAccountUrl(user.ExternalId);
        }

        body.general.claims = getClaims(user.Claims);

        body.groups = user.UserGroups.map(userGroup => {
            return {
                id: userGroup.UserGroupId,
                code: userGroup.UserGroupCode,
                name: userGroup.UserGroupName,
                nameLocalized: userGroup.UserGroupNameLocalized,
                isGroupManager: userGroup.IsGroupManager,
                substituteUserId: userGroup.SubstituteUserId || undefined,
                substituteUserDisplayName: userGroup.SubstituteUserDisplayName || undefined
            };
        });
        body.roles = user.UserRoles.map(userRole => {
            return {
                id: userRole.ApplicationRoleId,
                codeName: userRole.ApplicationRoleCodeName,
                userGroupNames: getRoleUserGroupNames(userRole.UserGroupCodes, user.UserGroups),
                isAssignedFromGroup: userRole.IsAssignedFromGroup
            };
        });
        this.view.validate();
    }
    else {
        body.general.isNewUser = true;
        body.general.loginType = 'UsernamePassword';
        body.general.claims = {
            IsUserActive: true,
            ExpireDate: '2100-01-01',
        };
    }

    this.view.validate();
    this.view.rebind();
    this.view.reevaluateRules();
};

function getRoleUserGroupNames(userRoleUserGroupCodes, userGroups) {
    const displayNames = userRoleUserGroupCodes.map((groupCode) => {
        const filteredUserGroups = userGroups.filter(group => group.UserGroupCode === groupCode);

        if (filteredUserGroups.length > 0) {
            return filteredUserGroups[0].UserGroupNameLocalized;
        }
        return groupCode;

    });

    return displayNames.join(', ');
}

function getClaims(userClaims) {
    let claims = {
        // The IsUserActive claim should be always set
        IsUserActive: 'false'
    };

    if (userClaims) {
        claims = userClaims;

        claims.IsUserActive = userClaims.IsUserActive !== 'false';
    }

    return claims;
}
