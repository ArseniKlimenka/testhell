'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = function substituteArrayOperationHandler(input, ambientProperties) {
    const { affectedRow, operationType, originalData } = input;

    if (operationType === 'Edit') {
        saveSubstitute(affectedRow, originalData, ambientProperties, this.view);
    }
};

async function saveSubstitute(data, originalData, ambientProperties, view) {
    view.startBlockingUI();

    const request = prepareSaveSubstituteRequest(data.userGroupCode, data.applicationUserId, data.substituteUserId);

    let result;
    try {
        view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        revertChangedSubstituteWithOriginalData(data, originalData);
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }
}

function prepareSaveSubstituteRequest(managedGroupCode, userId, substituteUserId) {
    let requestUrl = `api/organisation/public/user-management/currentUser/managedGroups/${managedGroupCode}/users/${userId}/substitute`;

    if (substituteUserId) {
        requestUrl = `${requestUrl}/${substituteUserId}`;
    }

    return {
        method: 'PUT',
        url: requestUrl,
        returnHttpPromise: true
    };
}

function revertChangedSubstituteWithOriginalData(affectedRow, originalData) {
    affectedRow.substituteUserId = originalData.substituteUserId;
    affectedRow.substituteUserDisplayName = originalData.substituteUserDisplayName;
}
