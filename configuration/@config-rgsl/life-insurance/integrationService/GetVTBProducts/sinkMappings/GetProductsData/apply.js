'use strict';


module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    if (!sinkResult.data || sinkResult.data.length === 0) {

        throw new Error('Е: По указанным сегментам продаж не найдено ни одного продукта.');
    }

    const output = {};
    output.data = {};
    output.data.products = [];

    const productsData = sinkResult.data.map(x => x.resultData);
    const productCodes = [...new Set(productsData.map(x => x.productCode))];

    sinkExchange.productCodes = productCodes;

    for (const productCode of productCodes) {

        const rows = productsData.filter(x => x.productCode === productCode);
        const risks = rows.map(x => {
            return {
                riskCode: x.riskCode,
                riskShortDescription: x.riskShortDescription,
                riskFullDescription: x.riskFullDescription,
                riskMandatory: x.riskMandatory
            };
        });

        const product = rows.map(x => {
            return {

                salesSegment: x.salesSegment,
                partnerCode: x.partnerCode,
                partnerBusinessCode: x.partnerBusinessCode,
                productType: x.productType,
                productName: x.productName,
                productCode: x.productCode
            };
        })[0];

        product.risks = risks;
        output.data.products.push(product);
    }

    sinkExchange.result = output;

    return output;
};
