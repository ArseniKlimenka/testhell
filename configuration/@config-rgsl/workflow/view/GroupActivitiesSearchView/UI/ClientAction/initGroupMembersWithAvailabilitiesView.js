module.exports = function initGroupMembersWithAvailabilitiesView(input, ambientProperties) {
    const { context } = input;
    if (!this.getCurrentView()) { return; }
    if (!context.request.data.criteria.groupCode || context.request.data.criteria.groupCode.indexOf('sales') == 0) {
        this.getCurrentView().getContext().Body = [];
        return;
    }
    const body = this.getCurrentView().getContext().Body;
    body.length = 0;

    const now = new Date();

    const request = {
        method: "POST",
        url: `api/entity-infrastructure/shared/datasource/UsersWorkLoadDataSource`,
        data: {
            data: {
                groupCode: context.request.data.criteria.groupCode,
                dates: [addDays(now, 1).toISOString(), addDays(now, 2).toISOString(), addDays(now, 7).toISOString()]
            }
        }
    };

    return ambientProperties.services.api
        .call(request)
        .then(result => {
            result.data.forEach(item => {
                const getPercent = i => item.load.length >= (i + 1) && item.load[i].relativeFreeWorkTime ? (1 - item.load[i].relativeFreeWorkTime) * 100 : undefined;
                body.push({
                    username: item.username,
                    numberOfActivities: item.numberOfActivities,
                    loadPercent24h: getPercent(0),
                    loadPercent48h: getPercent(1),
                    loadPercentWeek: getPercent(2)
                });
            });
            return 0;
        });
};

function addDays(date, numberOfDays) {
    return new Date(date.getTime() + numberOfDays * 86400000);
}
