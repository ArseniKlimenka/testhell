'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { massIssue } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = async function issueSertificates(input, ambientProperties) {

    const view = this.view;
    view.search();
    const allCertificatesData = await getAllCertificatesData(input, ambientProperties, this.view);
    const isNeedAlert = true;

    await massIssue(allCertificatesData.data, ambientProperties, this, isNeedAlert);
};


async function getAllCertificatesData(input, ambientProperties, view) {

    try {
        view.startBlockingUI();
        const itemsDataSourceRequest = {
            method: 'post',
            url: `api/entity-infrastructure/shared/datasource/GetAccountingCertificateDataSource`,
            data: {
                data: {
                    criteria: { ...input.context.request.data.criteria }
                }
            }
        };

        return await ambientProperties.services.api.call(itemsDataSourceRequest);

    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        view.stopBlockingUI();
    }
}
