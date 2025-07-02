module.exports = function resultMapping(input) {

    const ret = {
        bankStatementItemId: parseInt(input.bankStatementItemId),
    };

    return {
        data: ret,
        $recordKey: `${input.$rowNumber}`
    };

};
