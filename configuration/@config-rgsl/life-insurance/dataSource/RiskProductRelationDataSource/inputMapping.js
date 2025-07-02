'use strict';

module.exports = function (input) {

    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.sort = {};

    if (!input.data) {

        return output;
    }

    const criteria = input.data.criteria;
    const sort = input.data.sort;

    if (criteria) {

        if (criteria.productCode && criteria.productCode.length > 0) {

            output.parameters.productCode = criteria.productCode;
        }

        if (criteria.relationType && criteria.relationType.length > 0) {

            output.parameters.relationType = criteria.relationType;
        }

        if (criteria.parentRisk && criteria.parentRisk.length > 0) {

            output.parameters.parentRisk = criteria.parentRisk;
        }

        if (criteria.additionalBeneficiariesOnly) {

            output.parameters.additionalBeneficiariesOnly = true;
        }

        if (criteria.fullRiskOutput) {

            output.parameters.fullRiskOutput = true;
        }

        if (criteria.searchText) {

            output.parameters.searchText = '%' + criteria.searchText + '%';
        }
    }

    if (sort) {
        sort.forEach(element => {
            let dbName = '';
            const fieldName = element.fieldName;
            switch (fieldName) {
                case 'productCode':
                    dbName = 'PRODUCT_CODE';
                    break;
            }
            if (dbName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort[dbName] = direction;
            }
        });
    }

    return output;

};
