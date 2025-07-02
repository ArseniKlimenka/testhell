'use strict';

const { checkFullContains } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');

module.exports = function onChangeVariant(input, ambientProperties) {

    const selectedProducts = input.context.insuranceProduct?.values ?? [];
    const selectedProductCodes = selectedProducts.map(i => i.code);
    const selectedVariants = input.data?.values ?? [];
    const selectedVariantCodes = selectedVariants.map(i => i.code);
    const productVariantsList = input.rootContext.ClientViewModel.productVariantsList;
    const uniqueProductsData = productVariantsList.filter((obj, index) => {
        return index === productVariantsList.findIndex(o => obj.productCode === o.productCode);
    });
    const selectedVariantsForProducts = productVariantsList.filter(i => selectedVariantCodes.includes(i.variantCode));

    const productsWithVariants = [];
    const productsWithoutVariants = [];

    for (let index = 0; index < selectedProducts.length; index++) {

        const element = selectedProducts[index];

        if (uniqueProductsData.some(i => i.productCode == element.code)) {

            productsWithVariants.push(element);
        } else {

            productsWithoutVariants.push(element);
        }
    }

    if (selectedVariants?.length > 0 && productsWithoutVariants?.length > 0) {

        const messageWithoutVariants = `Продукты без вариантов: ` + Object.values(productsWithoutVariants).map(function (obj) {
            return `${obj.description} (${obj.code})`;
        }).join(', ') + ` будут удалены из списка выбранных продуктов при изменении условий вознаграждения!`;
        ambientProperties.services.confirmationDialog.showNotification(`${messageWithoutVariants}`, 'OK', 'OK', 2);

        input.rootContext.ClientViewModel.productWithVariantsToSet = productsWithVariants;
    }

    if (selectedVariants?.length > 0 && productsWithVariants?.length > 0) {

        const selectedVariantsInProductsAll = [];
        const selectedVariantsInProductsWithoutVariants = [];
        const productVariantsListByProductCode = groupByProductCode(productVariantsList);

        for (let index = 0; index < productsWithVariants.length; index++) {

            const productsWithVariantsElement = productsWithVariants[index];
            const productsWithVariantsCode = productsWithVariantsElement.code;

            if (productVariantsListByProductCode[productsWithVariantsCode]?.length > 0) {

                const variantsForProduct = productVariantsListByProductCode[productsWithVariantsCode].map(i => i.variantCode);
                const isVariantsAvailableForProduct = checkFullContains(variantsForProduct, selectedVariantCodes);

                if (isVariantsAvailableForProduct) {
                    selectedVariantsInProductsAll.push(...productVariantsListByProductCode[productsWithVariantsCode]);
                } else {
                    selectedVariantsInProductsWithoutVariants.push(...productVariantsListByProductCode[productsWithVariantsCode]);
                }
            }
        }

        if (selectedVariantsInProductsWithoutVariants?.length > 0) {

            const messageSelectedVariantsInProductsWithoutVariants = `Продукты для которых есть только часть вариантов: ` + Object.values(selectedVariantsInProductsWithoutVariants).map(function (obj) {
                return `${selectedProducts.filter(i => i.code == obj.productCode)[0].description} (${obj.productCode}) - ${obj.variantDescription} (${obj.variantCode})`;
            }).join(', ') + ` будут удалены из списка выбранных продуктов при изменении условий вознаграждения!`;
            ambientProperties.services.confirmationDialog.showNotification(`${messageSelectedVariantsInProductsWithoutVariants}`, 'OK', 'OK', 2);
        }

        if (selectedVariantsInProductsAll?.length > 0) {

            const productCodesWithSelectedVariants = selectedVariantsInProductsAll.map(i => i.productCode);
            const productWithVariantsToSet = productsWithVariants.filter(i => productCodesWithSelectedVariants.includes(i.code));
            input.rootContext.ClientViewModel.productWithVariantsToSet = productWithVariantsToSet;
        }

    }

    this.view.reevaluateRules();
    this.view.validate();
};

function groupByProductCode(array) {

    return array.reduce((acc, obj) => {

        const key = obj.productCode;

        if (!acc[key]) {

            acc[key] = [];
        }

        acc[key].push(obj);

        return acc;
    }, {});
}
