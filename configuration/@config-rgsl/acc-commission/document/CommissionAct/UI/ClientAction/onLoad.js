const { getInsuranceProductFilter } = require('@config-rgsl/life-insurance/lib/uiHelper');
const { currency } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { getActIncludedProducts, getCalcAmounts } = require('@config-rgsl/acc-commission/lib/actUtils');
const { getFirstOpenPeriodStart } = require('@config-rgsl/acc-base/lib/accUtils');
const { getProductConfiguration } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');
const { periodType } = require('@config-rgsl/acc-base/lib/accConsts');
const { commissionActTypeId } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = async function onLoad(input, ambientProperties) {
    try {
        this.view.startBlockingUI();

        const body = input.context.Body;
        if (!input.context.Number) {
            // TODO: check, I think there should be a wellknown mechanism that will prepare an initial document
            body.currencyCode = currency.localCurrency;
            body.actTypeId = commissionActTypeId.Normal;
            body.actIssueDate = await getFirstOpenPeriodStart(ambientProperties, periodType.COMMISSION_ACT);
        }

        if (input.context.Number) {
            await prepareIntersectionFilters(body, input.context, ambientProperties);
            input.context.ClientViewModel.calcAmounts = await getCalcAmounts(ambientProperties, input.context.Number);
        }

        const state = input.context.State?.Code;

        if (state !== "Draft") {

            this.view.disableAllElements();
        }

        this.view.rebind();
        this.view.validate();
    }
    finally {
        this.view.stopBlockingUI();
    }
};

async function prepareIntersectionFilters(body, context, ambientProperties) {
    const allProducts = context.ClientViewModel.allProducts;
    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/CommissionActIntersectionRgslDataSource',
        data: {
            data: {
                criteria: {
                    notActNo: context.actNo,
                    aaServiceProviderCode: body.aaServiceProviderCode,
                    aaNumber: body.aaNumber,
                    actTypeId: body.actTypeId,
                    reportingPeriodFrom: body.reportingPeriodFrom,
                    reportingPeriodTo: body.reportingPeriodTo,
                },
            }
        }
    };

    const resultData = await ambientProperties.services.api.call(request);
    const resultItems = resultData.data.map(_ => _.resultData);

    let includedProductsTotal = [];

    for (const resultItem of resultItems) {

        const includedProducts = getActIncludedProducts(resultItem, allProducts);

        const joinSet = [...includedProductsTotal, ...includedProducts];
        includedProductsTotal = [...new Set(joinSet)];
    }

    const includedCount = includedProductsTotal.length;
    const excludedCount = allProducts.length - includedProductsTotal.length;
    const result = {
        couldBeIncluded: undefined,
        mustBeExcluded: undefined,
    };
    if (includedCount > excludedCount) {
        result.couldBeIncluded = allProducts.filter(_ => !includedProductsTotal.includes(_.productCode)).map(_ => _.productCode);
    } else {
        result.mustBeExcluded = includedProductsTotal;
    }


    if (result.mustBeExcluded) {
        const body = context.Body;
        const productGroup = body.products.excludedGroup;
        const issueDate = body.actIssueDate;
        const partnerBusinessCode = body.agentBusinessCode;

        let newProducts = allProducts.filter(_ => result.mustBeExcluded.includes(_.productCode));
        newProducts = newProducts.filter(_ => !body.products.excluded.includes(_.productCode));
        newProducts = getInsuranceProductFilter(ambientProperties, newProducts, productGroup, partnerBusinessCode, issueDate, false, {});

        if (newProducts.length !== 0) {
            body.products.excluded.push(...newProducts.map(_ => _.productCode));
        }
    }

    context.ClientViewModel.intersections = result;
}
