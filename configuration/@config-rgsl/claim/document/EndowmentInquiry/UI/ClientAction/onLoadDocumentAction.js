'use strict';

const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoadDocumentAction(input, ambientProperties) {

    // set current assignee
    let currentAssignee = undefined;
    const entityId = input.context.Id;
    const isDocumentLocked = !isSaveOperationAvailable(this.view);

    if (isDocumentLocked) {

        this.view.disableAllElements();
    }

    if (entityId) {

        const activitiesRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/OpenStateActivityDataSource',
            data: {
                data: {
                    criteria: {
                        entityId: input.context.Id
                    }
                }
            }
        };

        let result;
        try {
            this.view.startBlockingUI();
            result = await ambientProperties.services.api.call(activitiesRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            this.view.stopBlockingUI();
        }

        if (result?.data?.length > 0) {

            currentAssignee = result.data[0].resultData.userName;
        }
    }

    input.context.ClientViewModel.currentAssignee = currentAssignee;

    const creatorUserName = input.context.Body.creatorUserName;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();

    if (currentUser != creatorUserName && currentUser != currentAssignee) {

        this.view.getControlByElementId('ai-operations-control').hideElement();
    }

    this.view.validate();
    this.view.reevaluateRules();
};
