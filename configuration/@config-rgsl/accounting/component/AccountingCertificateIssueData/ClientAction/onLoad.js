const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { mapFormat } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function onLoad(input, ambientProperties) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetAccountingCertificateDataSource',
        data: {
            data: {
                criteria: {
                    accountingCertificateNumber: input.rootContext.Number
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }

    if (result.data && result.data.length > 0) {

        mapFormat(input, result);
    }
};
