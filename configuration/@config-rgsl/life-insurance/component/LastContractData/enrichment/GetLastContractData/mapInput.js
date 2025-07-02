module.exports = function (externalData, body, componentContext) {

    if (!this?.businessContext?.documentNumber) { return null; }
    return {
        data: {
            criteria: {
                contractNumber: this.businessContext.documentNumber
            }
        }
    };
};
