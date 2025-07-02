'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

function fillCommonData(input, ambientProperties, that) {

    const originalConfigurationCodeName = input.rootContext?.OriginalConfigurationCodeName;
    const currentDateTime = DateTimeUtils.dateTimeNow();
    input.context.Body.lastUpdateDate = currentDateTime;

    if (originalConfigurationCodeName?.includes("Quote")) {
        input.context.Body.quote = {
            number: input.rootContext.Number,
            originalConfigurationCodeName: input.rootContext.ConfigurationCodeName,
            originalConfigurationVersion: input.rootContext.Version,
        };
    }

    if (originalConfigurationCodeName?.includes("Policy")) {
        input.context.Body.policy = {
            number: input.rootContext.Number,
            originalConfigurationCodeName: input.rootContext.ConfigurationCodeName,
            originalConfigurationVersion: input.rootContext.Version,
        };
    }
}

async function getQuoteByPolicyNumber(input, ambientProperties, that) {

    if (!input.context.Body?.quote?.number && input.context.Body?.policy?.number) {

        const relatedDocumentRequest = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RelatedDocumentsDataSource',
            data: {
                data: {
                    criteria: {
                        documentNumber: input.context.Body.policy.number
                    }
                }
            }
        };

        let result;
        try {
            that.view.startBlockingUI();
            result = await ambientProperties.services.api.call(relatedDocumentRequest);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            that.view.stopBlockingUI();
        }

        if (result?.data?.length > 0) {

            const quoteResultData = result.data.filter(i => i.resultData.related.codeName.includes('Quote'));
            const quoteData = quoteResultData[0]?.resultData?.related;
            const quoteNumber = quoteData?.documentNumber;
            const quoteCodeName = quoteData?.codeName;
            const quoteConfigurationVersion = quoteData?.configurationVersion;

            input.context.Body.quote = {
                number: quoteNumber,
                originalConfigurationCodeName: quoteCodeName,
                originalConfigurationVersion: quoteConfigurationVersion,
            };
        }
    }
}

async function getContractAdditionalParameters(input, ambientProperties, that) {

    const policyContext = that.view?.getParentView()?.getContext() ?? that.view?.getContext();
    const currentContractNumber = policyContext?.Number;

    const contractAdditionalParametersRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ContractAdditionalParametersDataSource',
        data: {
            data: {
                criteria: {
                    documentNumber: currentContractNumber,
                }
            }
        }
    };

    let contractEntityResult;
    let contractEntityCode;
    try {
        that.view.startBlockingUI();
        contractEntityResult = await ambientProperties.services.api.call(contractAdditionalParametersRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that.view.stopBlockingUI();
    }

    if (contractEntityResult?.data?.length > 0) {

        const contractEntityResultData = contractEntityResult.data.map(i => i.resultData);
        const isContractEntityLimitExceeded = contractEntityResultData.filter(i => i.contractNumber == currentContractNumber).length > 1;

        if (isContractEntityLimitExceeded) {

            const message = `По документу ${currentContractNumber} найдено более одного документа с дополнительными параметрами договора!`;
            const reqLinks = contractEntityResultData.map(item =>`<a href="/edit;entity=UniversalMasterEntity;configurationCodeName=ContractEntity;version=1;code=${encodeURIComponent(item.contractEntityDocumentNumber)}">${item.contractEntityDocumentNumber}</a>`);

            ambientProperties.services.confirmationDialog.showError(`${message} ${reqLinks?.join(', ')}.`, 'OK', 'OK', 2);

            return false;
        }

        if (contractEntityResultData?.length == 1) {

            contractEntityCode = contractEntityResultData.map(i => i.contractEntityDocumentNumber)[0];

            if (input.context?.ClientViewModel) {
                input.context.ClientViewModel.contractEntityCode = contractEntityCode;
            } else if (policyContext?.ClientViewModel) {
                policyContext.ClientViewModel.contractEntityCode = contractEntityCode;
            }
        }
    }

}

async function updateEconomicParameters(input, ambientProperties, that, productConfigurationNumber, productCode, selectedRules, contractNumbers) {

    const request = {
        method: 'post',
        url: 'api/core/shared/etl-services/UpdateEconomicParametersEtlService/1',
        data: {
            data: {
                productConfigurationNumber,
                productCode,
                selectedRules,
                contractNumbers
            }
        },
        returnHttpPromise: true
    };

    let result;
    try {
        that.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that.view.stopBlockingUI();
    }
}

module.exports = {
    fillCommonData,
    getQuoteByPolicyNumber,
    getContractAdditionalParameters,
    updateEconomicParameters
};
