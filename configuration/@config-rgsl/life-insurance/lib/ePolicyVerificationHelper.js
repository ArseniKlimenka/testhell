'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

async function sendVerificationEmail(input, ambientProperties, shouldSign, view) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/SendContractInfoEmail/1',
        data: {
            data: {
                contractNumber: input.context.Number,
                shouldSignAttachment: shouldSign
            }
        }
    };

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
}

async function sendSmsVerificationCode(input, ambientProperties, view) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/SendContractVerificationSms/1',
        data: {
            data: {
                contractNumber: input.context.Number
            }
        }
    };

    let isSent = false;
    let isOnCooldown = false;
    let cooldownTime = 0;

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

    isSent = result.data.isSent;
    isOnCooldown = result.data.isOnCooldown;
    cooldownTime = result.data.cooldownMinutes;

    return {
        isSent,
        isOnCooldown,
        cooldownTime
    };
}

async function getCurrentActivity(input, ambientProperties) {

    const activitiesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ActivitiesDataSource',
        data: {
            data: {
                criteria: {
                    businessNumber: input.context.Number,
                    businessNumberStrict: true,
                    hasAssigneeId: true,
                    activityStatus: 'Open'
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(activitiesRequest);
    }
    catch (err) {
        throwResponseError(err);
    }

    if (result && result.data.length > 0) {

        input.context.ClientViewModel.currentActivity = result.data[0].resultData;
    }
}

async function SendOfferInfoEmail(input, ambientProperties, shouldSign, view) {

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/SendOfferInfoEmail/1',
        data: {
            data: {
                contractNumber: input.context.Number,
                shouldSignAttachment: shouldSign
            }
        }
    };

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
}

module.exports = {
    sendVerificationEmail,
    sendSmsVerificationCode,
    getCurrentActivity,
    SendOfferInfoEmail
};
