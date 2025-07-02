'use strict';

module.exports = function departmentResponseMapping(input) {

    let output = [];

    if (input.response?.data?.length > 0) {

        output = input.response.data.map(elem => {
            const res = {};
            res.code = elem.resultData.code;
            res.nameLocalized = elem.resultData.nameLocalized;
            return (elem.resultData.type == 'backOffice' ||
            elem.resultData.name == 'UKSP' ||
            elem.resultData.name == 'callCenter') ? res : undefined;
        });
        output = output
            .filter(item => { return item != undefined; })
            .sort((a, b) => (a.nameLocalized > b.nameLocalized) ? 1 : ((b.nameLocalized > a.nameLocalized) ? -1 : 0));
    }

    return output;
};
