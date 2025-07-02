'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function onViewInitializedInsuredPerson(input, ambientProperties) {

    const currentView = this.getCurrentView();

    const context = input.context;
    const isPolicy = context?.Dimensions?.contractType == lifeInsuranceConstants.contractType.Policy;
    const documentNumber = input.context.Number;
    const policyHolderCode = input.context.Body.policyHolder?.partyData?.partyCode;
    const insuredPersonCode = input.context.Body.insuredPerson?.partyData?.partyCode;
    const isPolicyHolder = input.context.Body.insuredPerson?.isPolicyHolder;
    let cumulationQuoteNumber = documentNumber;

    if (isPolicy) {

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/RelatedDocumentsDataSource',
            data: {
                data: {
                    criteria: {
                        documentNumber: documentNumber
                    },
                }
            }
        };

        const resultData = await ambientProperties.services.api.call(request);

        const quoteNumber = resultData.data
            .filter(i => i.resultData.related.codeName.includes(lifeInsuranceConstants.contractType.Quote) &&
            i.resultData.related.documentState == 'Согласована')[0]?.resultData?.related?.documentNumber;

        cumulationQuoteNumber = quoteNumber;
    }

    if (cumulationQuoteNumber && insuredPersonCode) {

        currentView.setSearchRequest({
            data: {
                criteria: {
                    cumulationQuoteNumber: cumulationQuoteNumber,
                    partyCode: insuredPersonCode,
                }
            }
        });

        currentView.search();
    }

};
