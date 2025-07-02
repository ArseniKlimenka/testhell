const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onAfterGridAction(input, ambientProperties) {
    const { gridData, affectedRow, operationType } = input;
    const that = this;
    let createStrategyConfigurationRequest, editStrategyConfigurationRequest, data;
    let eTag, createdUniversalDocument, createdUniversalDocumentNumber;
    let result;

    switch (operationType) {
        case 'Add':

            createStrategyConfigurationRequest = {
                method: 'post',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyConfiguration/1/',
                data: {
                    data: {
                        strategyConfiguration: affectedRow.strategyConfiguration
                    }
                },
                callContext: {
                    workUnitActorCode: ambientProperties.currentWorkUnitActor
                },
                returnFullResponse: true
            };

            try {
                this.view.startBlockingUI();
                result = await ambientProperties.services.api.call(createStrategyConfigurationRequest);
            }
            catch (err) {
                throwResponseError(err);
            }
            finally {
                this.view.stopBlockingUI();
            }

            eTag = `${result.body.id}:${result.body.StateId}`;
            createdUniversalDocumentNumber = result.body.Number;
            createdUniversalDocument = input.context.Body[input.context.Body.length - 1];
            createdUniversalDocument.eTag = eTag;
            createdUniversalDocument.universalDocumentNumber = createdUniversalDocumentNumber;

            break;

        case 'Edit':
            editStrategyConfigurationRequest = {
                method: 'put',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyConfiguration/1/' + affectedRow.universalDocumentNumber,
                data: {
                    data: {
                        strategyConfiguration: affectedRow.strategyConfiguration
                    }
                },
                callContext: {
                    workUnitActorCode: ambientProperties.currentWorkUnitActor
                },
                headers: {
                    'If-Match': '"' + affectedRow.eTag.toLowerCase() + '"'
                },
                returnFullResponse: true
            };

            try {
                this.view.startBlockingUI();
                await ambientProperties.services.api.call(editStrategyConfigurationRequest);
            }
            catch (err) {
                throwResponseError(err);
            }
            finally {
                this.view.stopBlockingUI();
            }

            // increment eTag after each saving
            eTag = affectedRow.eTag;
            eTag = eTag.substring(0, eTag.indexOf(':') + 1) + (parseInt(eTag.substring(eTag.indexOf(':') + 1, eTag.length)) + 1);
            input.context.Body.find(e => e.universalDocumentNumber = affectedRow.universalDocumentNumber).eTag = eTag;

            that.view.stopBlockingUI();
            break;

        case 'Delete':

            editStrategyConfigurationRequest = {
                method: 'post',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyConfiguration/1/' + affectedRow.universalDocumentNumber + '/transitions/Draft_to_Deleted',
                data: {
                    data: {
                    }
                },
                callContext: {
                    workUnitActorCode: ambientProperties.currentWorkUnitActor
                },
                headers: {
                    'If-Match': '"' + affectedRow.eTag.toLowerCase() + '"'
                },
                returnFullResponse: true
            };

            try {
                this.view.startBlockingUI();
                await ambientProperties.services.api.call(editStrategyConfigurationRequest);
            }
            catch (err) {
                throwResponseError(err);
            }
            finally {
                this.view.stopBlockingUI();
            }
            break;
    }

};
