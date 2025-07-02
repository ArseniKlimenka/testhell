module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({
        referenceNo: item.resultData.referenceNo || '',
        startDate: item.resultData.startDate || '',
        dueDate: item.resultData.dueDate || '',
        stateCode: item.resultData.stateCode || '',
        holderName: item.resultData.holderName || '',
        productDescription: item.resultData.productDescription || '',
        transferState: item.resultData.transferState || '',
    }));

    return result;
};
