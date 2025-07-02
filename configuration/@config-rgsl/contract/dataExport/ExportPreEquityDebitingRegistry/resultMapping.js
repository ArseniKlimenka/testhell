module.exports = function resultMapping(input) {

    const result = input.data.map((item, index) => {
        const getField = (field) => item.resultData[field] || '';

        return {
            rowNumber: index + 1,
            contractNumber: getField("contractNumber"),
            portfolioName: getField("portfolioName"),
            amendmentNumber: getField("amendmentNumber"),
            amendmentType: getField("amendmentType"),
            netAssetsAmount: getField("netAssetsAmount"),
            reportDate: getField("reportDate")
        };
    });

    return result;
};
