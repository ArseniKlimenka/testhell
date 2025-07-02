module.exports = function (input) {
    const output = {
        parameters: {
            importDocumentId: input.data.criteria.importDocumentId,
            importDocumentNumber: input.data.criteria.importDocumentNumber
        }
    };

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            recordKeyInt: 'CAST(RECORD_KEY AS INT)',
            excelRowNumber: 'CAST(EXCEL_ROW_NUMBER AS INT)',
        };

        input.data.sort.forEach(element => {
            const dbName = columnNames[element.fieldName];

            if (dbName) {
                output.sort[dbName] = element.descending ? 'desc' : 'asc';
            }
        });
    }

    return output;
};
