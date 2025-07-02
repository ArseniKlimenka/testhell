'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function saveSubstitutes(input, ambientProperties) {
    const data = input.context;

    if (isValidForm(this.view)) {
        await executeSaveSubstitutes(data, ambientProperties, this.view);
    }
};

function isValidForm(view) {
    view.enableValidation();
    const errors = view.validateAndGroupByPath();

    if (errors && errors.length > 0) {
        view.expandSideContent();
        return;
    }

    return true;
}

function handleResponse(response, data, ambientProperties) {
    data.Body.userGroups.forEach((userGroup) => {
        const contextUserGroup = ambientProperties.applicationContext.currentUser().getUserGroups()
            .filter((contextUserGroup) => contextUserGroup.UserGroupId === userGroup.userGroupId)[0];

        contextUserGroup.SubstituteUserId = userGroup.substituteUserId ? userGroup.substituteUserId : null;
        contextUserGroup.SubstituteUserDisplayName = userGroup.substituteUserDisplayName ? userGroup.substituteUserDisplayName : null;
    });
}

function prepareRequest(data) {
    return {
        method: 'PUT',
        url: 'api/organisation/public/user-management/currentUser/groups/substitutes',
        data: {
            UserGroupSubstitutes: data.Body.userGroups.map((userGroup) => {
                return {
                    UserGroupCode: userGroup.userGroupCode,
                    SubstituteUserId: userGroup.substituteUserId
                };
            }),
        },
        returnHttpPromise: true
    };
}

async function executeSaveSubstitutes(data, ambientProperties, view) {
    const request = prepareRequest(data);

    let result;
    try {
        view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }

    handleResponse(result, data, ambientProperties);
}
