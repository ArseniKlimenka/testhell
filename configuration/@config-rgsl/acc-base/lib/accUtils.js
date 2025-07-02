const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { periodStatus } = require('@config-rgsl/acc-base/lib/accConsts');

async function getAllProducts(ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/ProductsDataSource',
        data: {
            data: {
                criteria: {
                },
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const result = resultData.data.map(_ => _.resultData);

    return result;
}

async function getFirstOpenPeriodStart(ambientProperties, ipPeriodTypeId) {
    const periodTypeId = ipPeriodTypeId ? [ipPeriodTypeId] : undefined;

    const periodRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PeriodDataSource',
        data: {
            data: {
                criteria: {
                    periodStatusId: periodStatus.OPEN,
                    periodTypeIds: periodTypeId,
                },
                sort: [{
                    fieldName: 'startDate',
                    descending: false,
                }]
            }
        }
    };

    const result = await ambientProperties.services.api.call(periodRequest);
    const periodData = result?.data[0];

    return (periodData && periodData.resultData) ?
        periodData.resultData.startDate :
        dateUtils.getFirstDateOfMonth(dateUtils.newDateAsString(dateUtils.DateFormats.ECMASCRIPT));
}

module.exports = {
    getAllProducts,
    getFirstOpenPeriodStart,
};
