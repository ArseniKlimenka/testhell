module.exports = function mapping(input, dataSourceResponse) {

    const body = this.businessContext.rootData;

    if (dataSourceResponse && dataSourceResponse.data && dataSourceResponse.data.length > 0) {
        body.allocationInformation = dataSourceResponse.data.map(_ => {
            if (_.resultData) {
                _ = _.resultData;
            }
            return {
                allocationId: _.allocationId,
                bsiNo: _.bsi.bsiNo,
                bsiDescription: _.bsi.description,
            };
        });
    }
    else {
        body.allocationInformation = [];
    }

};
