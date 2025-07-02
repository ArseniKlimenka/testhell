module.exports = function (externalData, dataSourceResponse) {

    const rows = dataSourceResponse.data.map(r => r.resultData);
    if (rows.length !== 1) {
        throw 'Wrong last data count found: ' + rows.length;
    }

    const row = rows[0];

    externalData.endDate = row.endDate;
};
