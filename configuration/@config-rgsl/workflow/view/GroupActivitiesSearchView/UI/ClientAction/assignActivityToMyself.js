module.exports = async function assignActivityToMyself(input, ambientProperties) {
    if (input.context.selection) {
        const activityIds = input.context.selection.map((activity) => {
            return activity.resultData.activityId;
        });
        if (activityIds.length > 0 && ambientProperties.applicationContext.currentUser().getUserName()) {
            const request = {
                method: 'post',
                url: 'api/core/shared/activities/assignment/',
                data: {
                    activityIds: activityIds,
                    username: ambientProperties.applicationContext.currentUser().getUserName()
                },
                throwException: true
            };
            const result = await ambientProperties.services.api.call(request);

            for (const user of input.context.selection) {
                user.resultData.assigneeId = ambientProperties.applicationContext.currentUser().getUserId();
                user.resultData.assigneeName = ambientProperties.applicationContext.currentUser().getUserName();
            }
        } else {
            ambientProperties.services.confirmationDialog.showWarning('Please select one or more activities!', 'Ok', 'Cancel', 1);
        }
    }
};
