module.exports = function resultMapping(input) {

    const mapped = {
        userName: input.userName ? input.userName : null,
        sendEmail: input.sendEmail == 'Да'
    };

    return {
        data: mapped,
        $recordKey: `${input.$rowNumber}`
    };
};
