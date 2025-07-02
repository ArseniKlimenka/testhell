const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function onAfterGridAction(input, ambientProperties) {
    const { gridData, affectedRow, operationType } = input;
    const that = this;
    let createstrategyInstrumentsRequest, editstrategyInstrumentsRequest, data;
    let eTag, createdUniversalDocument, createdUniversalDocumentNumber;
    let request;

    switch (operationType) {
        case 'Add':

            createstrategyInstrumentsRequest = {
                method: 'post',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyInstruments/1/',
                data: {
                    data: {
                        strategyInstruments: affectedRow.strategyInstruments
                    }
                },
                callContext: {
                    workUnitActorCode: ambientProperties.currentWorkUnitActor
                },
                returnFullResponse: true
            };

            try {
                this.view.startBlockingUI();
                request = await ambientProperties.services.api.call(createstrategyInstrumentsRequest);
            }
            catch (err) {
                throwResponseError(err);
            }
            finally {
                this.view.stopBlockingUI();
            }

            eTag = `${request.body.id}:${request.body.StateId}`;
            createdUniversalDocumentNumber = request.body.Number;
            createdUniversalDocument = input.context.Body[input.context.Body.length - 1];
            createdUniversalDocument.eTag = eTag;
            createdUniversalDocument.universalDocumentNumber = createdUniversalDocumentNumber;
            break;

        case 'Edit':
            editstrategyInstrumentsRequest = {
                method: 'put',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyInstruments/1/' + affectedRow.universalDocumentNumber,
                data: {
                    data: {
                        strategyInstruments: affectedRow.strategyInstruments
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


            await ambientProperties.services.api.call(editstrategyInstrumentsRequest);

            // increment eTag after each saving
            eTag = affectedRow.eTag;
            eTag = eTag.substring(0, eTag.indexOf(':') + 1) + (parseInt(eTag.substring(eTag.indexOf(':') + 1, eTag.length)) + 1);
            input.context.Body.find(e => e.universalDocumentNumber = affectedRow.universalDocumentNumber).eTag = eTag;
            break;

        case 'Delete':

            editstrategyInstrumentsRequest = {
                method: 'post',
                url: 'api/core/public/universal-documents/LifeInsuranceStrategyInstruments/1/' + affectedRow.universalDocumentNumber + '/transitions/Draft_to_Deleted',
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
                await ambientProperties.services.api.call(editstrategyInstrumentsRequest);
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
