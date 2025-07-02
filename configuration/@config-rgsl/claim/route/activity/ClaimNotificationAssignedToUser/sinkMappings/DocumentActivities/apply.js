'use strict';

module.exports = function mapping(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data && sinkResult.data.length > 0) {
        sinkExchange.claimNumber = sinkResult.data[0].resultData.businessNumber;
        const activityAssigneeData = sinkResult.data.filter(item => item.resultData.activityStatus == 'Open' && item.resultData.assigneeName);
        if (activityAssigneeData && activityAssigneeData.length > 0) {
            sinkExchange.assigneeName = activityAssigneeData[0].resultData.assigneeName;
            sinkExchange.assigneeId = activityAssigneeData[0].resultData.assigneeId;
        }
    }

};
