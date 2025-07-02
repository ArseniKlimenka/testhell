module.exports = async function CurrentUserActivitiesInfoOnLoad(input, ambientProperties) {

    const activitiesRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ActivitiesDataSource',
        data: {
            data: {
                criteria: {
                    assigneeId: ambientProperties.applicationContext.currentUser().getUserId(),
                    activityType: 'State',
                    activityStatus: 'Open'
                },
            }
        }
    };

    const result = await ambientProperties.services.api.call(activitiesRequest);

    let openActivitiesExist = false;
    let openActivitiesCount = 0;
    if (result && result.data && result.data.length > 0) {
        openActivitiesExist = true;
        openActivitiesCount = result.data.length;
    }

    this.view.getContext().openActivitiesExist = openActivitiesExist;
    this.view.getContext().openActivitiesCount = openActivitiesCount;
    this.view.reevaluateRules();
};
