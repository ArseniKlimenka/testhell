module.exports = function (input) {

    if (!input?.contract?.number) { return null; }
    return {
        data: {
            criteria: {
                contractNumber: input?.contract?.number
            }
        }
    };
};
