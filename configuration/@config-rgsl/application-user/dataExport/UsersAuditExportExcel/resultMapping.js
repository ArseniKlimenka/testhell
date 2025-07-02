module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            "name": item.resultData.name,
            "login": item.resultData.login,
            "lastLogin": item.resultData.lastLogin,
            "unit": item.resultData.unit,
            "partner": item.resultData.partner,
            "role": item.resultData.role,
            "tabNumber": item.resultData.tabNumber,
            "unitCode": item.resultData.unitCode
        };
    });

    return result;
};
