module.exports = function finalize() {
    const executionInput = this.businessContext.etlServiceInput;

    if (!executionInput.DataProviders) {
        return;
    }

    const publishedArtifactIds = executionInput.DataProviders.map(o => o.PublishedArtifactId);

    return {
        body: {
            PublishedArtifactIds: publishedArtifactIds,
            DeleteIndex: true
        }
    };
};
