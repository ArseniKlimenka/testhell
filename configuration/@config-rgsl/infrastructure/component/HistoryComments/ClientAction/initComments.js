const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function initComments(input, ambientProperties) {

    const entityData = input.rootContext;
    const viewData = this.getCurrentView().getContext();

    const commRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/HistoryCommentsDataSource',
        data: {
            data:{
                criteria: {
                    origDocumentNumber: entityData.OriginalDocumentNumber || null,
                    userGroup: entityData.WorkUnitActor?.CurrentActor || null
                },
                sort: [{
                    fieldName: 'createdOn',
                    descending: false
                }]
            }
        }
    };

    let result;

    try {

        result = await ambientProperties.services.api.call(commRequest);
    }
    catch (err) {

        throwResponseError(err);
    }

    const mappedResult = result.data.map(_ => _.resultData);

    viewData.Body = mappedResult;
    viewData.Number = entityData.Number;
};
