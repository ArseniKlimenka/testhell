'use strict';

const { modificationTypes, modifyCurator, modifyInitiator, modifyProductConfiguration } = require('@config-rgsl/life-insurance/lib/contractModificationHelper');
const { productConfigurationFilter } = require('@config-rgsl/life-insurance/lib//productConfigurationHelper');

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const serviceInput = sinkExchange.resolveContext('serviceInput');
    const docsToUpdate = sinkExchange.resolveContext('docsToUpdate');

    if (!docsToUpdate || docsToUpdate.length === 0) {

        throw 'не найдено действующих версий документа для обновления!';
    }

    const result = [];

    docsToUpdate.forEach(doc => {

        if (serviceInput.modificationType === modificationTypes.initiator && doc.body.initiator) {

            modifyInitiator(doc, serviceInput);
        }
        else if (serviceInput.modificationType === modificationTypes.curator && doc.body.curator) {

            modifyCurator(doc, serviceInput);
        }
        else if (serviceInput.modificationType === modificationTypes.productConfiguration && doc.body) {

            const productCode = doc.body.mainInsuranceConditions?.insuranceProduct?.productCode;
            const issueDate = doc.body.basicConditions?.issueDate;

            if (!productCode) {

                throw 'Код продукта в версии документа не найден, конфигурация не может быть подобрана!';
            }

            if (!issueDate) {

                throw 'Дата заключения в версии документа не найдена, конфигурация не может быть подобрана!';
            }

            const productConfigurations = additionalDataSourcesResults?.GetProductConfigurationDataSource?.data?.map(i => i.resultData);

            if (!productConfigurations?.length > 0) {

                throw `Конфигурация с версией ${serviceInput.productConfigurationVersion} не найдена!`;
            }

            const productConfiguration = productConfigurationFilter(productConfigurations, false, productCode, issueDate);

            if (!productConfiguration?.productCode) {

                throw `Для продукта с кодом ${productCode} на дату заключения ${issueDate} конфигурация не найдена!`;
            }

            modifyProductConfiguration(doc, serviceInput, productConfiguration);
        }

        result.push({
            configurationName: doc.conf,
            configurationVersion: "1",
            number: doc.number,
            body: doc.body,
            allowOnValidationErrors: {
                all: true
            },
            allowUpdatingInStates: [doc.documentState],
            useSinkConfOverride: true,
            allowActiveDocumentsUpdate: true
        });
    });

    return result;
};

