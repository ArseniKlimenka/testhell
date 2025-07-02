"use strict";

module.exports = function mapping(input, dataSource) {

    if (!dataSource || !dataSource.data || dataSource.data.length === 0) {

        input.inquiriesList.hasNotIssuedInquiries = false;

        return;
    }

    input.inquiriesList.hasNotIssuedInquiries = dataSource.data.some(x => x.resultData.state != 'Согласован');
};
