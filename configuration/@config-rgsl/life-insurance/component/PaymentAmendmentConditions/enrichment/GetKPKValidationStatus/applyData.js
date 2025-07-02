
module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        throw 'Не получен ответ от сервиса проверки КПК и ЧС!';
    }

    const body = this.businessContext.rootData;

    if (!body.tempTechnicalData) {

        body.tempTechnicalData = {};
    }

    body.tempTechnicalData.kpkValidationData = dataSource.data;
};
