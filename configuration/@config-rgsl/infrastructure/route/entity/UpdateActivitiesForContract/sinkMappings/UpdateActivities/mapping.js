module.exports = function mapping(input, sinkExchange) {

    const activities = sinkExchange.resolveContext('activities');

    const requests = activities.map(_ => ({
        body: {
            configurationCodeName: 'ActivitySearchIndex',
            documentType: 'Activity',
            entityId: _.activityId,
            entityType: 'ActivitySearchIndex',
            publishedArtifactVersion: '1',
        }
    }));

    return requests;
};
