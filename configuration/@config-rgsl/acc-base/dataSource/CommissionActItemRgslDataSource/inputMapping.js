module.exports = function DataSourceInputMapping(input) {
    if (!input.data?.criteria) {
        throw 'Input criteria was not defined!';
    }

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    let documentNumbers = input.data.criteria.documentNumbers;

    if (input.data.criteria.documentNumber) {

        if (!documentNumbers) {
            documentNumbers = [];
        }
        documentNumbers.push(input.data.criteria.documentNumber);
    }

    if (input.data.criteria.documentNumbersStr) {

        const parsed = input.data.criteria.documentNumbersStr.split(/(?:\r\n|\r|\n)/g);
        if (parsed.length === 0) {
            throw 'No documents was parsed: "' + input.data.criteria.documentNumbersStr + '"';
        }
        if (!documentNumbers) {
            documentNumbers = [];
        }
        documentNumbers.push(...parsed);
    }

    if (documentNumbers) {
        output.parameters.documentNumbers = documentNumbers;
    }

    if (input.data.criteria.insuredYearsCount) {
        throw 'Not supported filter! Moved to JSON!';
    }

    if (input.data.sort) {
        const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();

        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'polHolderName':
                    sortedFieldName = 'HOLDER_NAME';
                    break;
                case 'stateCodeDescription':
                    sortedFieldName = 'STATE';
                    break;
                case 'invCommRate':
                    sortedFieldName = 'INV_COMM_FINAL_RATE';
                    break;
                case 'creditProgramVersion':
                    sortedFieldName = 'PROGRAM_VERSION';
                    break;
                case 'commissionType':
                    sortedFieldName = 'LC_COMM_AMOUNT_EXTRA';
                    break;
                case 'salesChannelDescription':
                    sortedFieldName = 'SALES_CHANNEL_CODE';
                    break;
                case 'aaAgencyDescription':
                    sortedFieldName = 'AA_AGENCY_CODE';
                    break;
                default:
                    sortedFieldName = camelToSnakeCase(element.fieldName);
            }

            if (sortedFieldName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort = output.sort || {};
                output.sort[sortedFieldName] = direction;
            }
        });
    }

    if (!output.sort) {
        output.sort = {
            ACT_ITEM_ID: 'asc'
        };
    }

    return output;
};
