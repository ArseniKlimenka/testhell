'use strict';

module.exports = function resultMapping(input) {

    const productResult = getDataSourceResult(input, 'ProductsDataSource');
    const currencyResult = getDataSourceResult(input, 'GetAllCurrenciesDataSource');
    const paymentFrequencyResult = getDataSourceResult(input, 'PaymentFrequencyDataSource');
    const creditProgramResult = getDataSourceResult(input, 'CreditProgramsDataSource');

    const result = {
        startDate: input.resultData.startDate,
        endDate: input.resultData.endDate,
        insuranceYear: input.resultData.insuranceYear,
        insuranceTermFrom: input.resultData.insuranceTermFrom,
        insuranceTermTo: input.resultData.insuranceTermTo,
        premiumPeriodFrom: input.resultData.premiumPeriodFrom,
        premiumPeriodTo: input.resultData.premiumPeriodTo,
        rate: input.resultData.rate,
        expensesRate: input.resultData.expensesRate,
        natuaralPersonRate: input.resultData.natuaralPersonRate,
        solePropriatorRate: input.resultData.solePropriatorRate,
        amount: input.resultData.amount,
        isManualCorrectionDisabled: input.resultData.isManualCorrectionDisabled,
        alwaysUseMaxRate: input.resultData.alwaysUseMaxRate,
        isDiscountDisabled: input.resultData.isDiscountDisabled,
    };

    if (input.resultData.insuranceProduct) {

        const codes = input.resultData.insuranceProduct.split(';');
        const productObjects = [];
        const notFoundProducts = [];

        codes.forEach(c => {

            const foundProductData = productResult.find(p => p.productCode === c);

            if (foundProductData) {

                productObjects.push({
                    code: c,
                    description: foundProductData.productDescription
                });
            }
            else {

                notFoundProducts.push(c);
            }

        });

        if (productObjects.length > 0) {

            result.insuranceProduct = {
                data: productObjects,
                isInverted: input.resultData.insuranceProductInverted
            };
        }

        result.notFoundProducts = notFoundProducts;
    }

    if (input.resultData.insuranceCurrency) {

        const code = input.resultData.insuranceCurrency;
        const existingCode = currencyResult.find(cr => cr.currencyCode === code)?.currencyCode;

        if (existingCode) {

            result.insuranceCurrency = {
                data: existingCode,
                isInverted: input.resultData.insuranceCurrencyInverted
            };
        }
    }

    if (input.resultData.premiumPeriodType) {

        const codes = input.resultData.premiumPeriodType.split(';');
        const premiumPeriodTypeObjects = [];

        codes.forEach(c => {

            const foundPremiumPeriodTypeData = paymentFrequencyResult.find(p => p.paymentFrequencyCode === c);

            if (foundPremiumPeriodTypeData) {

                premiumPeriodTypeObjects.push({
                    code: c,
                    description: foundPremiumPeriodTypeData.paymentFrequencyDescription
                });
            }

        });

        if (premiumPeriodTypeObjects.length > 0) {

            result.premiumPeriodType = {
                data: premiumPeriodTypeObjects
            };
        }
    }

    if (input.resultData.creditProgram) {

        const codes = input.resultData.creditProgram.split(';');
        const creditProgramObjects = [];

        codes.forEach(c => {

            const foundCreditProgramData = creditProgramResult.find(p => p.creditProgramCode === c);

            if (foundCreditProgramData) {

                creditProgramObjects.push({
                    code: c,
                    description: foundCreditProgramData.creditProgramDescription
                });
            }
        });

        if (creditProgramObjects.length > 0) {

            result.creditProgram = {
                data: creditProgramObjects,
                isInverted: input.resultData.creditProgramInverted
            };
        }
    }

    return result;
};

function getDataSourceResult(input, dataSourceName) {

    return input.additionalDataSources.find(_ => _.dataSourceName === dataSourceName).response.data.map(_ => _.resultData);
}
