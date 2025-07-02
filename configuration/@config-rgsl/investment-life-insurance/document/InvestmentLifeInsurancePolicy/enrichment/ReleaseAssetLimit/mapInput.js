module.exports = function mapping(input) {

    const request = {
        contractNumber: this.businessContext.documentNumber
    };

    return request;
};
