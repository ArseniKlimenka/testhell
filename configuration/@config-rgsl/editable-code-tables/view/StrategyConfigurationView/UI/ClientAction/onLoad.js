const strategyConfiguration = require('@config-rgsl/editable-code-tables/lib/editableCodeTablesConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoad(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/UniversalDocumentDataSource',
        data: {
            data: {
                criteria: {
                    universalDocumentName: strategyConfiguration.codeName,
                    universalDocumentState: strategyConfiguration.allowedState
                }
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

    const resultData = result.data.map(e => {
        const strategyConfiguration = e.resultData.body.strategyConfiguration;
        return {
            universalDocumentNumber: e.resultData.universalDocumentNumber,
            eTag: e.resultData.eTag,
            strategyConfiguration: strategyConfiguration
        };
    });

    input.context.Body = resultData;

};
