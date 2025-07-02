'use strict';

const { getFirstEqualItemFromArrays } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    if (sinkResult.data.length == 0) {
        throw new Error(`Код ДО: ${sinkInput.input.data.criteria.businessCode} не найден в списке подразделений.`);
    }

    const selectedOrganisation = this.businessContext.etlServiceInput.importDocumentOrganisation;
    const selectedOrganisationCode = selectedOrganisation?.code;

    sinkExchange.DOInfo = sinkResult.data[0].resultData;

    if (selectedOrganisationCode) {

        const availableFromExcelOrganisationCodes = sinkResult.data.map(i => i.resultData.code);
        const selectedOrganisationUnitCodes = selectedOrganisation.unitCodes;

        const orgCode = getFirstEqualItemFromArrays(selectedOrganisationUnitCodes, availableFromExcelOrganisationCodes);

        if (orgCode) {
            sinkExchange.DOInfo = sinkResult.data.map(i => i.resultData).filter(i => i.code == orgCode)[0];
        } else {
            throw new Error(`Код ДО: ${sinkInput.input.data.criteria.businessCode} указанный в excel не найден вниз по иерархии подразделения: ${selectedOrganisation.name} выбранного при загрузке данных.`);
        }

    } else {

        if (sinkResult.data.length > 1) {
            throw new Error(`Найдено более одного возможного подразделения по коду ДО: ${sinkInput.input.data.criteria.businessCode}. Укажите подразделение на вкладке загрузить данные.`);
        }
    }

};
