module.exports = function (input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.criteria.product && input.data.criteria.product.productCode) {
        output.parameters.productCode = input.data.criteria.product.productCode;
    }

    if (input.data.criteria.productGroups) {
        output.parameters.productGroups = input.data.criteria.productGroups;
    }

    if (input.data.criteria.productsArray && input.data.criteria.productsArray.length > 0) {
        const productsArrayUnique = [...new Set(input.data.criteria.productsArray)];
        output.parameters.productsArray = JSON.stringify(productsArrayUnique);
        // output.parameters.productsArray = JSON.stringify(input.data.criteria.productsArray);
        output.parameters.productsArrayExists = true;
    }
    else {
        output.parameters.productsArray = '[]';
    }

    if (input.data.criteria.contractType) {
        output.parameters.contractTypeQuote = input.data.criteria.contractType == 'Quote';
        output.parameters.contractTypePolicy = input.data.criteria.contractType == 'Policy';
    }

    if (input.data.criteria.organisationUnitCode && !input.data.criteria.includeChildren) {
        output.parameters.organisationUnitCode = input.data.criteria.organisationUnitCode;
    }

    if (input.data.criteria.organisationUnitCodes && input.data.criteria.organisationUnitCodes.length > 0 && input.data.criteria.includeChildren) {
        output.parameters.organisationUnitCodes = JSON.stringify(input.data.criteria.organisationUnitCodes);
        output.parameters.organisationUnitCodesExist = true;
    }
    else {
        output.parameters.organisationUnitCodes = '[]';
    }

    if (input.data.criteria.isPersonalManager) {
        output.parameters.isPersonalManager = input.data.criteria.isPersonalManager;
    }

    return output;
};
