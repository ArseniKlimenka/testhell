module.exports = function applyData(input, dataSourceResponse) {
    const body = this.businessContext.rootData;

    if (dataSourceResponse.data) {
        const items = dataSourceResponse
            .data
            .map(_ => _.resultData);
        body.creditProgram.creditProgramVersion = items[0].creditProgramVersion;
    }
};
