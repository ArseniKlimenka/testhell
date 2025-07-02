module.exports = {

    /**
     * @description General function for the surrender values calculation
     */
    surrenderValuesCalculation: function (input, term) {

        const surrenderValues = [];
        for (let i = 1; i <= term; i++) {
            surrenderValues.push({
                year: i,
                surrenderValue: 0,
                paidUpValue: 0,
                surrenderRate: 0,
                paidUpRate: 0
            });
        }

        return {
            table: surrenderValues
        };

    }

};
