const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function fileUploaded(input, ambientProperties) {
    const body = input.context.Body;

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PopulateRsdItemsDataLoader',
        data: {
            data: {
                fileId: body.file.fileId,
            }
        }
    };

    let result;
    try {
        this.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    if (result?.data && result.data.length > 0) {
        body.itemCount = result.data.length;
    }
    else {
        body.itemCount = undefined;
    }
    this.view.rebind();
};
