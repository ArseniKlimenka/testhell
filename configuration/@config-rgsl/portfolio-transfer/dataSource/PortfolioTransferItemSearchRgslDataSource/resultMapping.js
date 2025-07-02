'use strict';

const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    return {
        itemId: input.PORTFOLIO_TRANSFER_ITEM_HKEY,
        documentNo: input.PORTFOLIO_TRANSFER_NUMBER,
        issueDate: input.ISSUE_DATE,
        serviceProviderNameFrom: input.SERVICE_PROVIDER_NAME_FROM,
        serviceProviderNameTo:input.SERVICE_PROVIDER_NAME_TO,
        transferState: input.TRANSFER_STATE,
        userName: input.USERNAME,
        referenceNo: input.CONTRACT_NUMBER,
        productDescription: input.PRODUCT_DESC,
        holderName: input.HOLDER_NAME,
        startDate: input.START_DATE,
        dueDate: input.DUE_DATE,
        configurationName: input.CODE_NAME,
        stateCode: translationUtils.getTranslation(`document/${input.CODE_NAME}/1`, 'states', null, input.CONTRACT_STATE),
    };
};
