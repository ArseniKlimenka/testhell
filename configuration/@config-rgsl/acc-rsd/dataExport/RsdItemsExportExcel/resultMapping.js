module.exports = function resultMapping(input) {

    const result = input.data.map(item => ({ ...item.resultData }));
    const required = [
        'contractNumber',
        'holderName',
        'currencyCode',
        'itemNo',
        'dueDate',
        'openAmount',
        'deadlineDate',
        'overdueDays',
        'rsdRate',
        'rsdAmount',
    ];

    result.forEach(_ => {
        required.forEach(field => {
            if (!_[field]) {
                _[field] = '-';
            }
        });
    });

    return result;
};
