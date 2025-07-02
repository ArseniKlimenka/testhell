'use strict';

module.exports = async function assignActivity(input, ambientProperties) {

    if (input.context.selection) {

        const activityIds = input.context.selection.map((activity) => {
            return activity.resultData.activityId;
        });

        const userToAssign = input.context.viewContext.userToAssign;

        if (activityIds.length > 0 && userToAssign) {

            const request = {
                method: 'post',
                url: 'api/core/shared/activities/assignment/',
                data: {
                    activityIds: activityIds,
                    username: userToAssign.username,
                },
                throwException: true
            };

            const result = await ambientProperties.services.api.call(request);

            for (const user of input.context.selection) {
                user.resultData.assigneeId = userToAssign.userId;
                user.resultData.assigneeName = userToAssign.username;
            }

        } else {

            ambientProperties.services.confirmationDialog.showWarning('Please select assignee and one or more activities!', 'Ok', 'Cancel', 1);
        }

        this.view.rebind();
    }
};
