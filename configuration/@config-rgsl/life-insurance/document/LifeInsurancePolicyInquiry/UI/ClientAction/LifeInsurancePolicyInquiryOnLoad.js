const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function LifeInsurancePolicyInquiryOnLoad(input, ambientProperties) {

    // set current assignee
    let currentAssignee = undefined;
    const entityId = input.context.Id;
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

        if (result && result.data && result.data.length > 0) {
            currentAssignee = result.data[0].resultData.userName;
        }
    }
    input.context.Body.inquiry.currentAssignee = currentAssignee;

    // disable save
    const creatorUserName = input.context.Body.inquiry.creatorUserName;
    const currentUser = ambientProperties.applicationContext.currentUser().getUserName();
    if (currentUser != creatorUserName && currentUser != currentAssignee) {
        this.view.getControlByElementId('ai-operations-control').hideElement();
    }

    this.view.validate();
    this.view.reevaluateRules();

};
