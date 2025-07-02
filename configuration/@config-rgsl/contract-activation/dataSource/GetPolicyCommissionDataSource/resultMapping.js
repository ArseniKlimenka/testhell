module.exports = function resultMapping(input) {

    return {
        contractNumber: input.CONTRACT_NUMBER,
        objectCode: input.OBJECT_CODE,
        itemCode: input.ITEM_CODE,
        periodNumber: input.PERIOD_NUMBER,
        docCommRate: input.MANUAL_RATE,
    };
};
