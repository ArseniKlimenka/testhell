module.exports = function dataSourceInputMapping(input) {

    const daysStr = this.environmentVariables['rgsl.userExpireDateWarnBeforeDays'];
    const days = parseInt(daysStr);
    if (!days || isNaN(days)) {
        throw 'The userExpireDateWarnBeforeDays was not set in the envirionment file!';
    }

    return {
        data: {
            criteria: {
                userExpireDateWarnBeforeDays: days,
            }
        }
    };
};
