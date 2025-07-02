"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        return;
    }

    input.errorsOnLoadExcel = dataSource.data.length > 0;

};
