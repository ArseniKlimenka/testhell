const strategyInstruments = require('@config-rgsl/editable-code-tables/lib/editableCodeTablesConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onLoad(input, ambientProperties) {
    let resultData = [];

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/UniversalDocumentDataSource',
        data: {
            data: {
                criteria:{
                    universalDocumentName: strategyInstruments.codeName,
                    universalDocumentState:  strategyInstruments.allowedState
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

    resultData = result.data.map(e => {
        const strategyInstruments = e.resultData.body.strategyInstruments;
        return {
            universalDocumentNumber: e.resultData.universalDocumentNumber,
            eTag: e.resultData.eTag,
            strategyInstruments: strategyInstruments
        };
    });
    input.context.Body = resultData;

};
