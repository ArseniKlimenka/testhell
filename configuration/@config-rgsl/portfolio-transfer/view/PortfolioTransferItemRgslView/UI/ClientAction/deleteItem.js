'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @translationKey {translationKey} ItemWasDeleted
 */

module.exports = async function deleteItem(input, ambientProperties) {
    const ONLY_OK_BUTTON = 1;

    if (!input.context.selection) {
        return;
    }

    const items = input.context.selection.map(_ => ({
        itemId: _.resultData.itemId,
        contractNumber: _.resultData.referenceNo,
        documentNo: _.resultData.documentNo
    }));

    if (items.length === 0) {
        return;
    }

    const itemIds = [];

    if (input.context.request.data.criteria.groupByRefNo) {

        for (const item of items) {

            const dataSourceRequest = {
                method: 'post',
                url: 'api/entity-infrastructure/shared/datasource/GetNettedItemsDataSource',
                data: {
                    data: {
                        criteria: {
                            referenceNo: item.contractNumber,
                            ptNumber: item.documentNo
                        },
                    }
                }
            };

            const resultData = await ambientProperties.services.api.call(dataSourceRequest);
            const resultItemsIds = resultData.data.map(_ => _.resultData.entityId.toLowerCase());

            itemIds.push(...resultItemsIds);
        }
    }
    else {

        itemIds.push(...items.map(x => x.itemId.toLowerCase()));
    }

    const request = {
        method: 'post',
        url: 'api/core/shared/integration-services/PtDeleteItem/1',
        data: {
            data:{
                hkeys: itemIds
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
        this.view.search();
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    ambientProperties.services.confirmationDialog.showNotification(ambientProperties.configurationCodeName.toUpperCase() + '.ItemWasDeleted', 'OK', 'Cancel', ONLY_OK_BUTTON);
};
