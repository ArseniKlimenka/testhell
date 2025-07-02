'use strict';

const { getIgnoreValidationsFlag, getActIncludedProducts } = require('@config-rgsl/acc-commission/lib/actUtils');
const { commissionActStatusCode } = require('@config-rgsl/acc-base/lib/actConsts');

/**
 * @translationKey {translationKey} WrongDuplicatePeriod
 * @translationKey {translationKey} HasIntersections
 */

module.exports = async function onBeforeSave(input, ambientProperties) {

    const ignoreValidations = getIgnoreValidationsFlag(ambientProperties);
    if (ignoreValidations) {
        return true;
    }

    const hasDuplicates = await CheckDuplicates(input, ambientProperties);
    if (hasDuplicates) {
        return false;
    }

    return true;
};

async function CheckDuplicates(input, ambientProperties) {
    const actNo = input.context.Number;
    const body = input.context.Body;
    const translate = ambientProperties.services.translate.getSync;
    const ONLY_OK_BUTTON = 1;

    const checkRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/CommissionActIntersectionRgslDataSource',
        data: {
            data: {
                criteria: {
                    notActNo: actNo,
                    aaServiceProviderCode: body.aaServiceProviderCode,
                    aaNumber: body.aaNumber,
                    actTypeId: body.actTypeId,
                    reportingPeriodFrom: body.reportingPeriodFrom,
                    reportingPeriodTo: body.reportingPeriodTo,
                }
            }
        },
    };

    const response = await ambientProperties.services.api.call(checkRequest);
    const acts = response.data.map(_ => _.resultData);

    if (acts.length === 0) {
        return false;
    }

    const allProducts = input.context.ClientViewModel.allProducts;
    const bodyIncludedProducts = getActIncludedProducts(({
        productGroupInclude: body.products.includedGroup,
        includedProducts: body.products.included,
        productGroupExclude: body.products.excludedGroup,
        excludedProducts: body.products.excluded,
    }), allProducts);

    const actsIntersectionsByStates = acts.filter(_ => ![
        commissionActStatusCode.DELETED,
        commissionActStatusCode.APPROVED,
        commissionActStatusCode.COMPLETED_PAY_ORDER,
        commissionActStatusCode.COMPLETED_PAID,
        commissionActStatusCode.ANNULLED
    ].includes(_.stateCode));

    for (const act of actsIntersectionsByStates) {

        const actNoLink = `<a href="/edit;entity=UniversalDocument;configurationCodeName=CommissionAct;version=1;documentNumber=${act.actNo}" target="_blank">${act.actNo}</a>`;

        if (act.reportingPeriodFrom != body.reportingPeriodFrom || act.reportingPeriodTo != body.reportingPeriodTo) {
            const wrnMsg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'WrongDuplicatePeriod', { actNo: actNoLink });
            await ambientProperties.services.confirmationDialog.showNotification(wrnMsg, 'OK', 'Cancel', ONLY_OK_BUTTON);
            return true;
        }
        const anotherActIncludedProducts = getActIncludedProducts(act, allProducts);
        if (bodyIncludedProducts.some(_ => anotherActIncludedProducts.includes(_))) {
            const wrnMsg = translate(ambientProperties.configurationCodeName.toUpperCase(), 'HasIntersections', { actNo: actNoLink });
            await ambientProperties.services.confirmationDialog.showNotification(wrnMsg, 'OK', 'Cancel', ONLY_OK_BUTTON);
            return true;
        }
    }

    return false;
}
